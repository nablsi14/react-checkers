
import React from 'react';
import Board from '../components/board/Board';

import Current from "../util/CurrentGame";
import MoveTree from '../util/MoveTree';

export default class BoardContainer extends React.Component {
    constructor () {
        super();
        this._tree = new MoveTree(Current.board, Current.turn);
        this.state = {
            array: this._tree.current_board,
            locked: false,
            selected: Object.create(null)
        };
    }
    componentDidMount () {
        this.props.exportBoard(this.exportMethods());
    }
    exportMethods () {
        let methods = Object.create(null);
        methods.makeMove = this.makeMove.bind(this);
        methods.getScore = this.getScore.bind(this);
        
        return methods;
    }
    getScore (player) {
        let score = 12;
        const other_player = MoveTree.otherPlayer(player);
        for (let row of this._tree.current_board)
            for (let piece of row)
                if (Math.trunc(piece) === other_player)
                    score--;
        return score;
    }
    handleClick ([row, col]) {
        console.log();
        if (this.state.locked) return;

        const piece = Math.trunc(this.state.array[row][col]);
        let selected = this.state.selected;
        //if the square clicked hold a piece of the current player
        if (piece === Current.turn)
            selected = Object.create(null);

        //check if the square has already be clicked
        //or if it is a piece of the player whose turn it is not
        if (selected[`${row},${col}`] === true
            || MoveTree.otherPlayer(Current.turn) === piece)
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
    handleKeyPress (event) {
        if (this.state.locked) return;

        if (event.key === "Enter") {
            this.makeMove();
        }
    }
    makeMove () {
        const keys = Object.keys(this.state.selected);
        const move = keys.map(k => k.split(",").map(Number));
        const move_results = this._tree.makeMove(move);
        if (move_results.success) {
            this.setState({
                array: this._tree.current_board,
                selected: Object.create(null)
            });
            Current.setBoard(this._tree.current_board);
            Current.setTurn(this._tree.current_player);
            Current.setPlayerScore(Current.turn, this.getScore(Current.turn));
            // this.props.save();
            if (move_results.game_over) {
                console.log("game over");
                this.setState({locked: true});
            } else if (Current.turnIsAI) {
                const selected = Object.create(null);
                const best = this._tree.getBestMove();
                console.log(JSON.stringify(best));
                for (const [row, col] of best) {
                    selected[`${row},${col}`] = true;
                }
                console.log(JSON.stringify(selected));
                this.setState(
                    {selected: selected, locked: true}, 
                    () => window.setTimeout(() => this.makeMove(), 1500)
                );
                
            } else {
                this.setState({locked: false});
            }
        } else
            console.log("invalid move");
    }
    render () {
        return <Board 
            onClick={this.handleClick.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
            selected={this.state.selected}
            squares={this.state.array}
            turn={Current.turn}
        />
            
    }
}