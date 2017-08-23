import React from 'react';
import "../css/ScoreBar.css";

const ScoreBar = props => {

        return (
            <div id="score">
                <div>
                    <input
                        maxLength="20"
                        name="p1"
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onFocus={props.onFocus}
                        style={{
                            color: "black",
                            fontStyle: props.turn === 1 ? "italic" : "normal",
                            marginLeft: "20px"
                        }}
                        value={props.p1.name}
                        type="text"
                    />: <span className="score">{props.p1.score}</span>
                </div>
                <div className="pull-right">
                        <input 
                            maxLength="20"
                            name="p2"
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                            onFocus={props.onFocus} 
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