import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import QueryString from 'query-string';

export default class HowToPlay extends React.Component {
    back () {
        const querys = QueryString.parse(this.props.location.search);
        
        if (querys.from === "play")
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
