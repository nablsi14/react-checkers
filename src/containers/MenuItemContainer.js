import React from 'react';
import MenuItem from '../components/MenuItem';

export default class MenuItemContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            mouseIsOver: false
        }
    }
    
    handleMouseEnter () {
        this.setState({mouseIsOver: true});
    }
    handleMouseLeave () {
        this.setState({mouseIsOver: false});
    }
    loadGame () {
        this.props.loadGame(this.props.index);
    }
    deleteGame () {
        this.props.deleteGame(this.props.index);
    }
    render () {
        return (
            <MenuItem 
                info={this.props.info}
                index={this.props.index}
                loadGame={this.loadGame.bind(this)}
                deleteGame={this.deleteGame.bind(this)}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}
                showButtons={this.state.mouseIsOver}
            />
        );
    }
}