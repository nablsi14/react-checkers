import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
// import { browserHistory } from 'react-router';

export default class HowToPlay extends React.Component {
    back () {
        if (window.gameToLoad !== null)
            this.props.history.push("/play");
        else
            this.props.history.push('/menu');
    }
    render () {
        return (
            <div>
                <h1>How To Play</h1>
                <Button bsStyle="success" onClick={this.back.bind(this)} style={{width: "200px"}}>
                    <Glyphicon glyph="chevron-left" />
                    Back
                </Button>
                <p>Sorry, instructions not yet added.</p>
            </div>
        );
    }   
}
