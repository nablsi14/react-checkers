import React from 'react';
import {Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import NewGameContainer from '../containers/NewGameContainer';
import MenuItemContainer from '../containers/MenuItemContainer';
import '../css/GameMenu.css';
const Menu = props => {

    const panels = props.games.map((game, index) => (
        <MenuItemContainer 
            deleteGame={props.deleteGame}
            info={game} 
            index={index} 
            key={"game"+index} 
            loadGame={props.loadGame}
        />
    ));
    return (
        <div style={{minHeight: "150px"}} id="savedGames">
            <div >
                <Button 
                    bsStyle="info" 
                    bsSize="large" 
                    style={{margin:"2px"}}
                >How to Play</Button>
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
                { panels }
            </ListGroup>
            <NewGameContainer shown={props.modalIsShown} close={props.closeModal}/>
        </div>
    );
}
export default Menu;