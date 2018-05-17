
import React from 'react';
import * as FontAwesome from "react-icons/lib/fa";
import { Link } from 'react-router-dom';
import { Button, } from 'reactstrap';

interface IBoardMenuProps {
    onMakeMoveClick: () => void;
    saved: boolean;
}

const BoardMenu = (props: IBoardMenuProps) => {
    const mainStyles = {
        display:  "table",
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
    
    
    return (
        <div style={mainStyles} className="clearfix">
            <Link to="/howtoplay" style={linkStyles}>
                <Button color="info" style={btnSyles} className="float-left">How to Play</Button>
            </Link>
            
            <Link to="/menu" style={linkStyles}>
                <Button color="danger" style={btnSyles} className="float-right">
                    Quit Game
                </Button>
            </Link>
            <Button 
                color="success" 
                className="float-right"
                onClick={props.onMakeMoveClick}
                style={btnSyles}
            >
                Make move
            </Button>
            <FontAwesome.FaFloppyO style={props.saved ? {color: "green"} : {color: "red"} } className="float-right"/> 
        </div>
    );
};
export default BoardMenu;

