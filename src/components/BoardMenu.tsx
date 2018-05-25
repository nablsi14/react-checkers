
import React, { Component, CSSProperties } from 'react';
import * as FontAwesome from "react-icons/lib/fa";
import { Link } from 'react-router-dom';
import { Button, Tooltip, } from 'reactstrap';

interface IBoardMenuProps {
    onMakeMoveClick: () => void;
    saved: boolean;
}
export default class BoardMenu 
        extends Component<IBoardMenuProps, { showTooltip: boolean }> {
    private mainStyles: CSSProperties = {
        display: "table",
        height: "35px",
        margin: "auto",
        width: "576px"
    };
    private btnSyles: CSSProperties = {
        margin: "2px"
    };
    private linkStyles: CSSProperties = {
        color: "white",
        textDecoration: "none"
    };
    private savedStyles: CSSProperties = {
        color: this.props.saved ? "green" : "red",
        position: "relative",
        top: "15px"
    };

    constructor (props: IBoardMenuProps) {
        super(props);
        this.state = {
            showTooltip: false
        }
        this.toogleTooltip = this.toogleTooltip.bind(this);
    }

    public render () {        
        return (
            <div style={ this.mainStyles }>
                <Link to="/howtoplay" style={ this.linkStyles }>
                    <Button color="info" style={ this.btnSyles } className="float-left">How to Play</Button>
                </Link>
                <FontAwesome.FaFloppyO style={ this.savedStyles } className="float-right" id="gameIsSavedIcon"/>
                <Tooltip target="gameIsSavedIcon" toggle={ this.toogleTooltip } isOpen={ this.state.showTooltip }>
                    {this.props.saved && "Game Saved"}
                    {!this.props.saved && "Game NOT Saved"}
                </Tooltip>
                <Button 
                    color="success" 
                    className="float-right"
                    onClick={ this.props.onMakeMoveClick }
                    style={ this.btnSyles }
                >
                    Make move
                </Button>
                <Link to="/menu" style={ this.linkStyles }>
                    <Button color="danger" style={ this.btnSyles } className="float-right">
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
