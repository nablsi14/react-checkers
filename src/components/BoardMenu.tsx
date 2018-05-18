
import React from 'react';
import * as FontAwesome from "react-icons/lib/fa";
import { Link } from 'react-router-dom';
import { Button, Tooltip, } from 'reactstrap';

interface IBoardMenuProps {
    onMakeMoveClick: () => void;
    saved: boolean;
}
export default class BoardMenu extends React.Component<IBoardMenuProps, { showTooltip: boolean }> {
    constructor (props: IBoardMenuProps) {
        super(props);
        this.state = {
            showTooltip: false
        }
        this.toogleTooltip = this.toogleTooltip.bind(this);
    }

    public render () {   
        const mainStyles = {
            display: "table",
            height: "35px",
            margin: "auto",
            width: "576px"
        };
        const btnSyles = {
            margin: "2px"
        };
        const linkStyles = {
            color: "white",
            textDecoration: "none"
        };
        const savedStyles: { color: string, position: "relative", top: string} = {
            color: this.props.saved ? "green" : "red",
            position: "relative",
            top: "15px"
        }
        
        return (
            <div style={mainStyles}>
                <Link to="/howtoplay" style={linkStyles}>
                    <Button color="info" style={btnSyles} className="float-left">How to Play</Button>
                </Link>
                <FontAwesome.FaFloppyO style={ savedStyles } className="float-right" id="gameIsSavedIcon"/>
                <Tooltip target="gameIsSavedIcon" toggle={ this.toogleTooltip } isOpen={ this.state.showTooltip }>
                    {this.props.saved && "Game Saved"}
                    {!this.props.saved && "Game NOT Saved"}
                </Tooltip>
                <Button 
                    color="success" 
                    className="float-right"
                    onClick={this.props.onMakeMoveClick}
                    style={btnSyles}
                >
                    Make move
                </Button>
                <Link to="/menu" style={linkStyles}>
                    <Button color="danger" style={btnSyles} className="float-right">
                        Quit Game
                    </Button>
                </Link>
                
            </div>
        );
    }
    private toogleTooltip (): void {
        this.setState({showTooltip: !this.state.showTooltip })
    }
}
