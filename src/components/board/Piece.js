import React from 'react';

const Piece = props => {
    const player = props.player;
    const isKing = player !== Math.trunc(player);
    const selected = props.selected;
    return (
        <div className={`piece p${Math.trunc(player)} ${isKing ? "king":""} ${selected ? "selected" :""}`}>
            <img src={require('../../images/crown.png')} alt="king"/>
        </div>
    );
};
export default Piece;