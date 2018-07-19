import Lockr from "lockr";
import QueryString from "query-string";
import React, { Component } from "react";
import Board from "../components/board/Board";
import BoardMenu from "../components/BoardMenu";
import GameOverModal from "../components/GameOverModal";
import ScoreBar, { IScoreBarProps } from "../components/ScoreBar";
import { IGameInfo, IPlayerInfo, Position } from "../sharedTypes";
import MoveTree, { Player } from "../util/MoveTree";

interface IGameContainerProps {
    location: any;
    history: string[];
}
interface IGameContainerState {
    board: MoveTree;
    created: Date;
    gameOver: boolean;
    isSaved: boolean;
    last: Date;
    p2: IPlayerInfo;
    p1: IPlayerInfo;
    selected: {
        [key: string]: boolean;
    };
    tempNames: {
        p1: string | null;
        p2: string | null;
        [key: string]: string | null;
    };
    [key: string]: any;
}
export default class GameContainer extends Component<
    IGameContainerProps,
    IGameContainerState
> {
    constructor(props: IGameContainerProps) {
        super(props);
        Lockr.prefix = "react_checkers";
        const savedGames: IGameInfo[] = Lockr.get("saved_games") || [];

        const querys: any = QueryString.parse(this.props.location.search);

        if (querys.newGame === "true") {
            Lockr.set("saved_games", savedGames.slice(1));
        }

        let index: number = querys.index;

        if (isNaN(index) || index < 0 || index >= savedGames.length) {
            index = 0;
        }
        const game: IGameInfo = savedGames[index];

        this.state = {
            board: new MoveTree(game.board, game.turn, 5),
            created: game.created,
            gameOver: false,
            isSaved: !querys.newGame,
            last: game.last,
            p1: game.p1,
            p2: game.p2,
            selected: {},
            tempNames: {
                p1: null,
                p2: null
            }
        };
        this.makeMove = this.makeMove.bind(this);
        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    public componentDidMount(): void {
        if (this.currentPlayerIsAI()) {
            const selected = Object.create(null);
            this.state.board
                .getBestMove()
                .forEach(([row, col]) => (selected[`${row},${col}`] = true));
            this.setState({ selected }, () => {
                window.setTimeout(this.makeMove, 750);
            });
        }
    }
    public currentPlayerIsAI(): boolean {
        const player: Player = this.state.board.current_player;
        return this.state["p" + player].is_ai;
    }
    public getScore(player: Player): number {
        let score = 12;
        const otherPlayer = MoveTree.otherPlayer(player);
        for (const row of this.state.board.current_board) {
            for (const piece of row) {
                if (Math.trunc(piece) === otherPlayer) {
                    score--;
                }
            }
        }
        return score;
    }
    public getScoreBarProps(): IScoreBarProps {
        return {
            onBlur: this.handleNameBlur.bind(this),
            onChange: this.handleNameChange.bind(this),
            onFocus: this.handleNameFocus.bind(this),
            p1: this.state.p1 as IPlayerInfo,
            p2: this.state.p2 as IPlayerInfo,
            turn: this.state.board.current_player
        };
    }
    public handleBoardKeyPress(
        event: React.KeyboardEvent<GameContainer>
    ): void {
        if (this.state.locked) {
            return;
        }

        if (event.key === "Enter") {
            this.makeMove();
        }
    }
    public handleNameChange(e: any): void {
        const validName = (name: string) => !/<|>/g.test(name);

        const newName = e.target.value;
        if (!validName(newName)) {
            return;
        }
        const player = this.state[e.target.name];
        player.name = newName;
        this.setState(
            {
                [e.target.name]: player
            },
            this.saveGame
        );
    }
    public handleNameBlur(e: any): void {
        if (e.target.value.trim().length === 0) {
            // console.log(e.target.name);
            const player = this.state[e.target.name];
            player.name = this.state.tempNames[e.target.name];
            // console.log(player);
            this.setState(
                {
                    [e.target.name]: player
                },
                this.saveGame
            );
        }
    }
    public handleNameFocus(e: any): void {
        const playerName = e.target.name;
        const tempNames = this.state.tempNames;
        tempNames[playerName] = this.state[playerName].name;
        this.setState({ tempNames });
    }
    public handleSquareClick([row, col]: Position): void {
        if (this.state.locked) {
            return;
        }

        const piece = Math.trunc(this.state.board.current_board[row][col]);
        let selected = this.state.selected;
        // if the square clicked hold a piece of the current player
        const current_player = this.state.board.current_player;
        if (piece === current_player) {
            selected = Object.create(null);
        }
        // check if the square has already be clicked
        // or if it is a piece of the player whose turn it is not
        if (
            selected[`${row},${col}`] === true ||
            MoveTree.otherPlayer(current_player) === piece
        ) {
            return;
        }

        // if the square clicked is empty AND a piece has valid piece had already be selected
        if (
            piece === 0 &&
            Object.keys(selected).length > 0 &&
            selected.constructor === Object
        ) {
            return;
        }

        selected[`${row},${col}`] = true;
        this.setState({ selected });
    }
    public makeMove(): void {
        if (this.state.locked && !this.currentPlayerIsAI()) {
            return;
        }
        const keys: string[] = Object.keys(this.state.selected);
        if (keys.length === 0) {
            return;
        }

        const move: Position[] = keys.map(
            (k: string): Position => k.split(",").map(Number) as Position
        );
        const board: MoveTree = this.state.board.getResultingTree(
            move
        ) as MoveTree;
        const player: Player = this.state.board.current_player;
        const selected = Object.create(null);

        if (board !== null) {
            this.setState({ board, locked: false }, () => {
                // check for a change in a player's score
                // and save the game
                if (player === 1) {
                    const p1: IPlayerInfo = this.state.p1 as IPlayerInfo;
                    p1.score = this.getScore(player);
                    this.setState({ p1 }, this.saveGame);
                } else if (player === 2) {
                    const p2: IPlayerInfo = this.state.p2 as IPlayerInfo;
                    p2.score = this.getScore(player);
                    this.setState({ p2 }, this.saveGame);
                } else {
                    this.saveGame();
                }
                if (board.game_over) {
                    this.setState({ gameOver: true });
                } else {
                    // check if the AI needs to make a move
                    if (this.currentPlayerIsAI()) {
                        this.state.board
                            .getBestMove()
                            .forEach(
                                ([row, col]) =>
                                    (selected[`${row},${col}`] = true)
                            );
                        this.setState({ selected, locked: true }, () => {
                            window.setTimeout(this.makeMove.bind(this), 750);
                        });
                    }
                }
            });
        }
        // console.log(JSON.stringify(selected));
        this.setState({ selected });
    }
    public render() {
        let winner: string = "";
        if (this.state.gameOver) {
            const pNum = MoveTree.otherPlayer(this.state.board.current_player);
            winner = this.state["p" + pNum].name;
        }
        return (
            <div>
                <BoardMenu
                    saved={this.state.isSaved}
                    onMakeMoveClick={this.makeMove}
                />
                <ScoreBar {...this.getScoreBarProps()} />
                <Board
                    onSquareClick={this.handleSquareClick}
                    onKeyPress={this.makeMove}
                    selected={this.state.selected}
                    squares={this.state.board.current_board}
                    turn={this.state.board.current_player}
                />
                <GameOverModal shown={this.state.gameOver} winner={winner} />
            </div>
        );
    }
    public saveGame() {
        Lockr.prefix = "react_checkers";
        if (typeof Storage === "undefined") {
            // console.warn('This browser does not support localstroage. Unable to save games.');
            this.setState({ isSaved: false });
        } else if (this.state.gameOver) {
            const saved: IGameInfo[] = Lockr.get("saved_games");
            saved.shift();
            Lockr.set("saved_games", saved);
        } else {
            const { board, created, p1, p2 } = this.state;
            const gameInfo: IGameInfo = {
                board: board.current_board,
                created: created as Date,
                isNewGame: false,
                last: new Date(), // .toDateString(),
                p1: p1 as IPlayerInfo,
                p2: p2 as IPlayerInfo,
                turn: board.current_player
            };

            const savedGames: IGameInfo[] = Lockr.get("saved_games") || [];
            if (!this.state.isSaved) {
                Lockr.set("saved_games", [gameInfo, ...savedGames]);
            } else {
                savedGames[0] = gameInfo;
                Lockr.set("saved_games", savedGames);
            }

            this.setState({ isSaved: true });
            // console.log("game saved");
        }
    }
}
