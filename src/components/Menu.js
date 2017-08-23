import React from 'react';
import {Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewGameContainer from '../containers/NewGameContainer';
import MenuItem from './MenuItem';

const Menu = props => {

    const menuItems = props.games.map((game, index) => (
        <MenuItem
            deleteGame={props.deleteGame}
            info={game} 
            index={index} 
            key={"game"+index} 
            loadGame={props.loadGame}
        />
    ));
    return (
        <div style={{minHeight: "150px"}} id="savedGames">
            <div style={{height: "50px"}}>
                <Link to="/howtoplay" style={{color: "white", textDecoration: "none"}}>
                    <Button 
                        bsStyle="info" 
                        bsSize="large" 
                        style={{margin:"2px"}}
                    >How to Play</Button>
                </Link>
                <Button 
                    bsStyle="success" 
                    bsSize="large" 
                    className="pull-right" 
                    onClick={props.openModal}
                    style={{margin:"2px"}}
                >
                    New Game <Glyphicon glyph="plus"></Glyphicon>
                </Button>
            </div>
            <ListGroup style={{clear: "left", display: "block", height: "100%"}}>
                {props.games.length === 0 &&
                    <ListGroupItem>
                        <h2 className='text-center'>You have no saved games</h2>
                    </ListGroupItem>
                }
                { menuItems }
            </ListGroup>
            <NewGameContainer shown={props.modalIsShown} close={props.closeModal}/>
        </div>
    );
}
export default Menu;