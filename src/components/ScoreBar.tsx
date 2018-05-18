import React from 'react';
import { IPlayerInfo } from "../containers/GameContainer";
import "../css/ScoreBar.css";
import { Player } from "../util/MoveTree";

export interface IScoreBarProps {
    onBlur: (e: any) => void;
    onChange: (e: any) => void;
    onFocus: (e: any) => void;
    turn: Player;
    p1: IPlayerInfo;
    p2: IPlayerInfo;
}

const ScoreBar = (props: IScoreBarProps) => {
        return (
            <div id="score">
                <div>
                    <input
                        maxLength={20}
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
                <div className="float-right">
                        <input 
                            maxLength={20}
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