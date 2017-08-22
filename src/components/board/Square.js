import React from 'react';
import Piece from './Piece';

const Square = props => {
    const player = props.player;
    const isSelected = props.player === 0 && props.selected;
    return (
        <div className={`square ${isSelected ? "selected":""}`} 
            onClick={() => props.onClick(props.position)}>
            {player !== 0 && 
                <Piece 
                    player={player} 
                    selected={props.selected && player !== 0}
                />
            }
        </div>
    );
};
export default Square;