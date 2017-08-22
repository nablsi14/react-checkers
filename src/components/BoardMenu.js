import React from 'react';
import { Button, Glyphicon} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BoardMenu = props => {
    const main_styles = {
        display:  "table",
        margin: "auto",
        height: "35px",
        width: "576px"
    };
    const btn_syles = {
        margin: "2px"
    };
    const link_styles = {
        color: "white",
        textDecoration: "none"
    };
    const saveGlyph = (props.saved 
        ? <Glyphicon glyph="floppy-saved" style={{color: "green"}}></Glyphicon>  
        : <Glyphicon glyph="floppy-remove" style={{color: "red"}}></Glyphicon>
    );
    
    return (
        <div style={main_styles}>
            <Button bsStyle="info" style={btn_syles}>How to Play</Button>
            {saveGlyph}
            <Link to="/menu" style={link_styles}>
                <Button bsStyle="danger" className="pull-right" style={btn_syles}>
                    Quit Game
                </Button>
            </Link>
            <Button 
                bsStyle="success" 
                className="pull-right"
                onClick={props.onMakeMoveClick}
                style={btn_syles}
            >Make move</Button>
        </div>
    );
};
export default BoardMenu;

