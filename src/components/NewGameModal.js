import React from 'react';
import { 
    Button,
    Checkbox, 
    Col, 
    ControlLabel,
    FormControl,
    FormGroup,
    Modal, 
    OverlayTrigger, 
    Row, 
    Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NewGameModal = props => {

    const overlay_props = {
        placement: "bottom",
        overlay: <Tooltip id="tooltip">When checked, this player will be controled by the computer</Tooltip>
    };
    const form_control_props = {
        type:"text",
        maxLength: 20,
        onChange: props.onChange
    };
    const link_styles = {
        color: "white", 
        display: "block", 
        height: "100%", 
        textDecoration: "none"
    };
    return (
        <Modal show={props.shown} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Create A New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Set the names of the players</p>
                <Row>
                    <form>
                        <Col xs={6}>
                            <h2>Player 1 (<span className="p1_name">Black</span>)</h2>
                            <FormGroup controlId="p1_setup" validationState={props.validName("p1Name")}>
                                <ControlLabel>Player 1's Name:</ControlLabel>
                                <FormControl name="p1Name" value={props.p1Name} {...form_control_props} onChange={props.onChange}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <OverlayTrigger {...overlay_props}>
                                <Checkbox inline 
                                    name="p1AI" 
                                    checked={props.p1AI}
                                    onChange={props.onChange}
                                    disabled
                                >AI Player</Checkbox>
                            </OverlayTrigger>
                        </Col>
                        <Col xs={6}>
                            <h2>Player 2 (<span className="p2_name">Red</span>)</h2>
                            <FormGroup controlId="p1_setup" validationState={props.validName("p2Name")}>
                                <ControlLabel>Player 2's Name:</ControlLabel>
                                <FormControl name="p2Name" value={props.p2Name} {...form_control_props} onChange={props.onChange}/>
                                <FormControl.Feedback />
                            </FormGroup>
                            <OverlayTrigger {...overlay_props}>
                                <Checkbox inline 
                                    name="p2AI"
                                    checked={props.p2AI}
                                    onChange={props.onChange}
                                    disabled
                                >AI Player</Checkbox>
                            </OverlayTrigger>
                        </Col>
                    </form>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" bsSize="large">
                    <Link to={{pathname:"/play", search: "?index=0&newGame=true"}}
                        style={link_styles} 
                        onClick={props.submit}
                    >Play Game!</Link>
                </Button>
                <Button 
                    bsStyle="danger" 
                    bsSize="large" 
                    onClick={props.close}
                >Cancel</Button>
            </Modal.Footer>
        </Modal>
    );

};
export default NewGameModal;