import React from 'react';
import Lockr from "lockr";

import Menu from '../components/Menu';

export default class MenuContainer extends React.Component {

    constructor (props) {
        super(props);
        Lockr.prefix = "react_checkers";
        this.state = {
            saved: [],
            showModal: false
        }
    }
    closeModal () {
        this.setState({showModal: false});
    }
    componentWillMount () {
        Lockr.prefix = "react_checkers";
        if (!window.localStorageSupport)
            console.warn('This browser does not support localstroage. Unable to save games.');
        window.gameToLoad = null;
        this.setState({
            saved: Lockr.get("saved_games") || []
        });
    }
    deleteGame (index) {
        let {saved} = this.state;
        saved.splice(index, 1);
        Lockr.set("saved_games", saved);
        this.setState({saved});
    }
    loadGame (index) {
        const {saved} = this.state;
        const [game] = saved.splice(index, 1);
        window.gameToLoad = game;
        Lockr.set("saved_games", saved);
    }
    openModal () {
        this.setState({showModal: true});
    }
    render () {
        return (
            <Menu 
                closeModal={this.closeModal.bind(this)}
                deleteGame={this.deleteGame.bind(this)}
                games={this.state.saved}
                loadGame={this.loadGame.bind(this)}
                modalIsShown={this.state.showModal}
                openModal={this.openModal.bind(this)}
            />
        );
    }
}