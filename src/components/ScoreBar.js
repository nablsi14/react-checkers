import React from 'react';
import "../css/ScoreBar.css";

const ScoreBar = props => {
    return (
        <div id="score">
            <div>
                <input
                    maxLength="20"
                    onChange={e => props.onChange(1, e)}
                    style={{
                        color: "black",
                        fontStyle: props.turn === 1 ? "italic" : "normal",
                        marginLeft: "20px"
                    }}
                    type="text"
                    value={props.p1.name}
                />: <span className="score">{props.p1.score}</span>
            </div>
            <div className="pull-right">
                    <input 
                    maxLength="20"
                    onChange={e => props.onChange(2, e)} 
                    style={{
                        color: "red", 
                        fontStyle: props.turn === 2 ? "italic" : "normal"
                    }}
                    type="text" 
                    value={props.p2.name}
                />: <span className="score">{props.p2.score}</span>
            </div>
        </div> 
    );
};
export default ScoreBar;