import Lockr from 'lockr';
import React from 'react';
import NewGameModal from '../components/NewGameModal';
import { IGameInfo } from './GameContainer';

interface INGCProps {
    shown: boolean;
    close: () => void;
}
interface INGCState {
    p1Name: string;
    p2Name: string;
    p1AI: boolean;
    p2AI: boolean;
    [key: string]: string | boolean;
}

export default class NewGameContainer extends React.Component<INGCProps, INGCState> {

    constructor (props: INGCProps) {
        super(props);
        this.state = {
            p1AI: false,
            p1Name: "Player 1",
            p2AI: false,
            p2Name: "Player 2"
        }
        this.checkPlayerName = this.checkPlayerName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public handleChange (event: any): void {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({
            [target.name] : value
        });
    }
    public handleSubmit (event: any): void {
        const validP1Name: boolean = this.checkPlayerName("p1Name");
        const validP2Name: boolean = this.checkPlayerName("p1Name");

        if (validP1Name && validP2Name) {
            const info: IGameInfo = {
                board: null,
                created: new Date(),
                isNewGame: true,
                last: new Date(),
                p1: {name: this.state.p1Name, is_ai: this.state.p1AI, score: 0},
                p2: {name: this.state.p2Name, is_ai: this.state.p2AI, score: 0},
                turn: 1
            };
            Lockr.prefix = "react_checkers";
            const saved: IGameInfo[] = Lockr.get("saved_games") || [];
            Lockr.set("saved_games", [info, ...saved]);
            this.props.close();
        } else {
            // console.log("invalid name(s)");
            event.preventDefault();
        }

    }
    public render () {
        return (
            <NewGameModal 
                {...this.state} 
                close={ this.props.close }
                onChange={ this.handleChange }
                shown={ this.props.shown }
                submit={ this.handleSubmit }
                validName={ this.checkPlayerName }
            />
        );
    }
    private checkPlayerName (player: string): boolean { 
        const name: string = this.state[player] as string;
        return (!(/<|>/g.test(name) || name.trim() === "")) 
    }
}