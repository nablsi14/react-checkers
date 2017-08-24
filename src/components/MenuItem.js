import React from 'react';
import { Button, Col, Glyphicon, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import formatDate from '../util/formatDate';

export default class MenuItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showButtons: false
        };
    }
    render () {
        const {info} = this.props;
        const link_styles = {
            color: "white", 
            display: "block", 
            height: "100%",
            margin: "4px 0px",
            textDecoration: "none"
        };
        return (
            <ListGroupItem
                onMouseEnter={() => this.setState({showButtons: true})}
                onMouseLeave={() => this.setState({showButtons: false})}
                style={{display:"inline-block", width: "100%", marginBottom: "-4px"}}
            >
                <Col xs={8}>
                    <h3>
                        <span style={{color:"black", fontStyle: info.turn === 1 ? "italic" : "normal"}}>
                            {info.p1.name}
                        </span>
                        <span className='small'> vs </span>
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
                {this.state.showButtons &&
                    <Col xs={4}>
                        <Link to={{pathname:"/play", search:`?index=${this.props.index}`}} style={link_styles}>
                            <Button block
                                bsStyle="success"
                            >Resume Game {' '}
                                <Glyphicon glyph="share-alt"></Glyphicon>
                            </Button>
                        </Link>
                        <Button block
                            bsStyle="danger"
                            className='delete'
                            onClick={() => this.props.deleteGame(this.props.index)}
                        >Delete Game 
                            <Glyphicon glyph="remove"></Glyphicon>
                        </Button>
                    </Col>
                }
            </ListGroupItem>
        );
    }
}