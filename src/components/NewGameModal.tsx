import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { 
    Button, 
    Col, 
    Form, FormFeedback, FormGroup, 
    Input, 
    Label, 
    Modal, ModalBody, ModalFooter, ModalHeader, 
    Row, 
    Tooltip 
} from 'reactstrap';

import "../css/NewGame.css";

interface INGMProps {
    close: () => void;
    onChange: (e: any) => void;
    p1AI: boolean;
    p1Name: string;
    p2AI: boolean;
    p2Name: string
    shown: boolean;
    submit: (e: any) => void;
    validName: (player: string) => boolean;
}

export default class NewGameModal extends Component<INGMProps, {
    p1AiOpen: boolean;
    p2AiOpen: boolean;
}> {
    private linkStyles: CSSProperties = {
        color: "white", 
        display: "block", 
        height: "100%", 
        textDecoration: "none"
    };
    constructor (props: INGMProps) {
        super(props);
        this.state = {
            p1AiOpen: false,
            p2AiOpen: false,
        }
        this.toogleP1Ai = this.toogleP1Ai.bind(this);
        this.toogleP2Ai = this.toogleP2Ai.bind(this);
    }

    public render () {
        const formControlProps = {
            maxLength: 20,
            onChange: this.props.onChange,
        };
        const validP1Name = this.props.validName("p1Name");
        const validP2Name = this.props.validName("p2Name");
        return (
            <Modal isOpen={ this.props.shown } onExit={ this.props.close } size="lg" tabIndex={-1}>
                <ModalHeader toggle={ this.props.close }>
                    Create A New Game
                </ModalHeader>
                <ModalBody>
                    <p>Set the names of the players</p>
                    <Form>
                        <Row>
                            <Col xs={6}>
                                <FormGroup>
                                    <h2>Player 1 (<span className="p1_name">Black</span>)</h2>
                                    <Label for="p1Name">Player 1's Name:</Label>
                                    <Input type="text" { ...formControlProps }
                                        invalid={ !validP1Name }
                                        name="p1Name"
                                        valid={ validP1Name }
                                        value={ this.props.p1Name }
                                        />
                                    <FormFeedback valid={false}>Sorry, that is not a valid name</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <h2>Player 2 (<span className="p2_name">Red</span>)</h2>
                                    <Label for="p2Name">Player 2's Name:</Label>
                                    <Input type="text" { ...formControlProps }
                                        invalid={ !validP2Name }
                                        name="p2Name" 
                                        value={ this.props.p2Name }  
                                        valid={ validP2Name }/>
                                    <FormFeedback valid={false}>Sorry, that is not a valid name</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={ 6 }>
                                <FormGroup check={ true }>
                                    <Label check={ true } id="p1AICheck">
                                        <Input type="checkbox"
                                            checked={ this.props.p1AI }
                                            disabled={ true }
                                            name="p1AI" 
                                            onChange={ this.props.onChange } />
                                        AI Player
                                    </Label>
                                    <Tooltip target="p1AICheck" 
                                        isOpen={ this.state.p1AiOpen }
                                        placement="bottom"
                                        toggle={ this.toogleP1Ai }>
                                        When checked, this player will be controled by the computer
                                    </Tooltip>
                                </FormGroup>
                            </Col>
                            <Col xs={ 6 }>
                                <FormGroup check={ true }>
                                    <Label check={ true } id="p2AICheck">
                                        <Input type="checkbox"
                                            checked={ this.props.p2AI }
                                            disabled={ true }
                                            name="p2AI"
                                            onChange={ this.props.onChange } />
                                        AI Player
                                    </Label>
                                    <Tooltip target="p2AICheck" 
                                        isOpen={ this.state.p2AiOpen } 
                                        placement="bottom" 
                                        toggle={ this.toogleP2Ai }>
                                        When checked, this player will be controled by the computer
                                    </Tooltip>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Link to={ {pathname:"/play", search: "?index=0&newGame=true"} }
                        style={ this.linkStyles } 
                        onClick={ this.props.submit }>
                        <Button color="success" size="lg">Play Game!</Button>
                    </Link>
                    <Button 
                        color="danger" 
                        size="lg" 
                        onClick={ this.props.close }
                    >Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
    private toogleP1Ai (): void {
        this.setState({ p1AiOpen: !this.state.p1AiOpen })
    }
    private toogleP2Ai(): void {
        this.setState({ p2AiOpen: !this.state.p2AiOpen })
    }
}

