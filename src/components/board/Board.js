import React from 'react';
import Square from './Square';

import "../../css/Board.css";

const Board = props => {
    const style = {
        borderColor: props.turn === 1 ? "#444" : "red"
    }
    const squares = [];
    props.squares.forEach((arr, row) => {
        arr.forEach((square, col) => {
            const isSelected = props.selected[`${row},${col}`] === true;
            squares.push(
                <Square key={`${row}-${col}`}
                    onClick={props.onSquareClick}
                    selected={isSelected}
                    player={square} 
                    position={[row, col]}
                /> 
            );
        });
        squares.push(<div className="hidden" key={`hidden${row}`}></div>);
    });
    
    return (
        <div id="board" style={style} tabIndex="0" onKeyPress={props.onKeyPress}>
            {squares}
        </div>
    );
};
export default Board;