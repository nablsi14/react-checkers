import React from 'react';
import { Button, Col, Glyphicon, ListGroupItem } from 'react-bootstrap';


import formatDate from '../util/formatDate';

const MenuItem = props => {
    const {info} = props;
    return (
        <ListGroupItem className='game' 
            id={`game-${props.index}`}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            style={{display:"inline-block", width: "100%", marginBottom: "-4px"}}
        >
            <Col xs={8}>
                <h3>
                    <span style={{color:"black", fontStyle: info.turn === 1 ? "italic" : "normal"}}>
                        {info.p1.name}
                    </span>
                    {' '}<span className='small'>vs</span>{' '}
                    <span style={{color: "red", fontStyle: info.turn === 2 ? "italic" : "normal"}}>
                        {info.p2.name}
                    </span>
                </h3>
                <h4>Score:{' '}
                    <span style={{color:"black"}}>{info.p1.score}</span>:
                    <span style={{color: "red"}}>{info.p2.score}</span>
                </h4>
                <p>
                    Created: {formatDate(new Date(info.created))} {' '}
                    Last played: {formatDate(new Date(info.last))}
                </p>
            </Col>
            <Col xs={4} className={`gameOptions ${props.showButtons ? "" : "hidden"}`}>
                <Button bsStyle="success" block onClick={props.loadGame}>
                    Resume Game{' '}
                    <Glyphicon glyph="share-alt"></Glyphicon>
                </Button>
                <Button bsStyle="danger" block className='delete' onClick={props.deleteGame}>
                    Delete Game 
                    <Glyphicon glyph="remove"></Glyphicon>
                </Button>
            </Col>
        </ListGroupItem>
    );
};
export default MenuItem;