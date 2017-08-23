import React from 'react';
import Lockr from 'lockr';
import { Redirect } from 'react-router-dom'

import Board from '../components/board/Board';
import BoardMenu from '../components/BoardMenu';
import ScoreBar from '../components/ScoreBar';

import MoveTree from '../util/MoveTree';

export default class GameContainer extends React.Component {
    constructor () {
        super();
        if (window.gameToLoad === null) return;
        const {board, turn, p1, p2} = window.gameToLoad;
        this.state = {
            board: new MoveTree(board, turn),
            locked: false,
            isSaved: true,
            p1: p1,
            p2: p2,
            savedGames: [],
            selected: Object.create(null),
            tempNames: {
                p1: null, p2: null
            },
        };
    }
    componentDidMount () {
        const game = window.gameToLoad;
        if (game !== null) {
            const savedGames = Lockr.get("saved_games") || [];
            if (!game.isNewGame)
                Lockr.set("saved_games", [window.gameToLoad, ...savedGames]);
            this.setState({
                isSaved: !game.isNewGame,
                savedGames
            });
        }
    }
    getScore (player) {
        let score = 12;
        const other_player = MoveTree.otherPlayer(player);
        for (let row of this.state.board.current_board)
            for (let piece of row)
                if (Math.trunc(piece) === other_player)
                    score--;
        return score;
    }
    getScoreBarProps () {
        return {
            p1: this.state.p1,
            p2: this.state.p2,
            onBlur: this.handleNameBlur.bind(this),
            onChange: this.handleNameChange.bind(this),
            onFocus: this.handleNameFocus.bind(this),
            turn: this.state.board.current_player,
        };
    }
    handleBoardKeyPress (event) {
        if (this.state.locked) return;

        if (event.key === "Enter") {
            this.makeMove();
        }
    }
    handleNameChange (e) {
        const validName = name => !(/<|>/g).test(name);
        
        const newName = e.target.value;
        if (!validName(newName)) return;
        const player = this.state[e.target.name];
        player.name = newName;
        this.setState({
            [e.target.name]: player
        }, this.saveGame);
    }
    handleNameBlur (e) {
        if (e.target.value.trim().length === 0) {
            console.log(e.target.name);
            const player = this.state[e.target.name];
            player.name = this.state.tempNames[e.target.name];
            console.log(player);
            this.setState({
                [e.target.name]: player 
            }, this.saveGame);
        }  
    }
    handleNameFocus (e) {
        const playerName = e.target.name;
        const tempNames = this.state.tempNames;
        tempNames[playerName] = this.state[playerName].name;
        this.setState({ tempNames });
    }
    handleSquareClick ([row, col]) {
        if (this.state.locked) return;
        
        const piece = Math.trunc(this.state.board.current_board[row][col]);
        let selected = this.state.selected;
        //if the square clicked hold a piece of the current player
        const current_player = this.state.board.current_player;
        if (piece === current_player)
            selected = Object.create(null);

        //check if the square has already be clicked
        //or if it is a piece of the player whose turn it is not
        if (selected[`${row},${col}`] === true
            || MoveTree.otherPlayer(current_player) === piece)
            return;

        //if the square clicked is empty AND a piece has valid piece had already be selected
        if (piece === 0 
            && Object.keys(selected).length > 0 
            && selected.constructor === Object) {
            return;
        }
        
        selected[`${row},${col}`] = true;
        this.setState({selected});
    }
    makeMove () {
        if (this.state.locked) return;
        const player = this.state.board.current_player;
        const keys = Object.keys(this.state.selected);
        const move = keys.map(k => k.split(",").map(Number));
        const board = this.state.board.getResultingTree(move);
        if (board !== null) {
            this.setState({board}, () => {
                //check for a change in a player's score
                //and save the game
                if (player === 1) {
                    const {p1} = this.state;
                    p1.score = this.getScore(player);
                    this.setState({p1}, this.saveGame);
                } else if (player === 2) {
                    const {p2} = this.state;
                    p2.score = this.getScore(player);
                    this.setState({p2}, this.saveGame);
                } else
                    this.saveGame();
                
            });
        }
        this.setState({selected: Object.create(null)});
    }
    render () {
        return (
            <div>
                {window.gameToLoad === null &&
                    <Redirect to="/menu" />
                }
                {window.gameToLoad !== null &&
                <div>
                    <BoardMenu
                        saved={this.state.isSaved}
                        onMakeMoveClick={this.makeMove.bind(this)}
                    />
                    <ScoreBar {...this.getScoreBarProps()} />
                    <Board 
                        onSquareClick={this.handleSquareClick.bind(this)}
                        onKeyPress={this.makeMove.bind(this)}
                        selected={this.state.selected}
                        squares={this.state.board.current_board}
                        turn={this.state.board.current_player}
                    />
                </div>
                }
            </div>
        );
    }
    saveGame () {
        if (!window.localStorageSupport) {
            console.warn('This browser does not support localstroage. Unable to save games.');
            this.setState({isSaved: false});
        }
        else {
            const {board, p1, p2, savedGames} = this.state;
            const {created} = window.gameToLoad;
            const gameInfo = {
                board: board.current_board,
                created,
                last: new Date(),
                p1, p2,
                turn: board.current_player,
            };
            Lockr.prefix = "react_checkers";
            Lockr.set("saved_games", [gameInfo, ...savedGames]);
            this.setState({isSaved: true});
        }
        console.log("game saved");
    }
}
