import React, { CSSProperties } from 'react';
import * as FontAwesome from "react-icons/lib/fa";
import { Link } from 'react-router-dom';
import { Button, Col, ListGroupItem, Row } from 'reactstrap';

import { IGameInfo } from '../containers/GameContainer';
import formatDate from '../util/formatDate';

interface IMenuItemProps {
    deleteGame: (index: number) => void;
    info: IGameInfo;
    index: number;
};

interface IMenuItemState {
    showButtons: boolean;
};

export default class MenuItem extends React.Component<IMenuItemProps, IMenuItemState> {
    private linkStyles: CSSProperties = {
        color: "white", 
        display: "block", 
        height: "100%",
        margin: "4px 0px",
        textDecoration: "none"
    };

    constructor (props: IMenuItemProps) {
        super(props);
        this.state = {
            showButtons: false
        };
    }
    public render () {
        const { info } = this.props;
        const deleteGame = () => this.props.deleteGame(this.props.index);
        const mouseEnter = () => this.setState({showButtons: true});
        const mouseLeave = () => this.setState({showButtons: false})
        return (
            <ListGroupItem
                onMouseEnter={ mouseEnter }
                onMouseLeave={ mouseLeave }
                style={ {display:"inline-block", width: "100%", marginBottom: "-4px"} }>
                <Row>
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
                    <Col xs={4}>
                        {this.state.showButtons && <div>
                            <Link to={ {pathname:"/play", search:`?index=${this.props.index}`} } style={ this.linkStyles} >
                                <Button block={ true }
                                    color="success" >
                                    Resume Game {' '}
                                    <FontAwesome.FaShareSquare />
                                </Button>
                            </Link>
                            <Button block={ true }
                                color="danger"
                                className='delete'
                                onClick={ deleteGame } >
                                Delete Game {" "}
                                <FontAwesome.FaTrash />
                            </Button>
                        </div>}
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}