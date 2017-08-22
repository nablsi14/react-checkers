import React from 'react';

import NewGameModal from '../components/NewGameModal';

export default class NewGameContainer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            p1Name: "Player 1",
            p2Name: "Player 2",
            p1AI: false,
            p2AI: false
        }
    }
    handleChange (event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({
            [target.name] : value
        });
    }
    handleSubmit (event) {
        const valid_p1_name = this.checkPlayerName("p1Name") === "success";
        const valid_p2_name = this.checkPlayerName("p1Name") === "success";

        if (valid_p1_name && valid_p2_name) {
            const info = {
                board: null,
                created: new Date(),
                isNewGame: true,
                p1: {name: this.state.p1Name, is_ai: this.state.p1AI, score: 0},
                p2: {name: this.state.p2Name, is_ai: this.state.p2AI, score: 0},
                turn: 1
            };
            window.gameToLoad = info;
            this.props.close();
        } else {
            console.log("invalid name(s)");
            event.preventDefault();
        }

    }
    checkPlayerName (player) { 
        
        const name = this.state[player];
        if (!(/<|>/g.test(name) || name.trim() === ""))
            return "success";
        return "error";
    }
    render () {
        return (
            <NewGameModal 
                {...this.state} 
                close={this.props.close}
                onChange={this.handleChange.bind(this)}
                shown={this.props.shown}
                submit={this.handleSubmit.bind(this)}
                validName={this.checkPlayerName.bind(this)}
            />
        );
    }
}