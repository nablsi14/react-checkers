import Lockr from "lockr";
import React from 'react';
import Menu from '../components/Menu';
import { IGameInfo } from './GameContainer';


// declare const localStorageSupport: boolean;
// declare var gameToLoad: boolean | null;

interface IMenuContainerState {
    saved: IGameInfo[];
    showAlert: boolean;
    showModal: boolean;
}

export default class MenuContainer extends React.Component<{}, IMenuContainerState> {

    constructor (props: {}) {
        super(props);
        Lockr.prefix = "react_checkers";
        this.state = {
            saved: [],
            showAlert: false,
            showModal: false,
        }
        this.closeModal = this.closeModal.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    public componentDidMount (): void {
        Lockr.prefix = "react_checkers";
        if (typeof(Storage) === "undefined") {
            // tslint:disable-next-line:no-console
            console.warn('This browser does not support localstroage. You will be unable to save games.');
            this.setState({ showAlert: true });
        }
        // gameToLoad = null;
        this.setState({
            saved: Lockr.get("saved_games") || []
        });
    }
    /**
     * dismissAlert
     */
    public dismissAlert (): void {
        this.setState({ showAlert: false });
    }
    public deleteGame (index: number): void {
        const { saved } = this.state;
        saved.splice(index, 1);
        Lockr.set("saved_games", saved);
        this.setState({saved});
    }
    public openModal (): void {
        this.setState({showModal: true});
    }
    public closeModal (): void {
        this.setState({showModal: false});
    }

    public render (): JSX.Element {
        return (
            <Menu 
                closeModal={ this.closeModal }
                deleteGame={ this.deleteGame }
                dismissAlert={ this.dismissAlert }
                games={ this.state.saved }
                modalIsShown={ this.state.showModal }
                openModal={ this.openModal }
                showAlert={ this.state.showAlert }
            />
        );
    }
    
}