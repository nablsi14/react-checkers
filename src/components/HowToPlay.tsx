import QueryString from 'query-string';
import React, { Component } from 'react';
import * as FontAwesome from "react-icons/lib/fa";
import { Button } from 'reactstrap';

interface IHTPProps {
    location: any;
    history: string[]
}

export default class HowToPlay 
        extends Component<IHTPProps, {}> {
    public back () {
        const querys = QueryString.parse(this.props.location.search);
        
        if (querys.from === "play") {
            this.props.history.push("/play");
        } else {
            this.props.history.push('/menu');
        }
    }
    public render () {
        const back = this.back.bind(this);
        return (
            <div>
                <h1>How To Play</h1>
                <Button color="success" onClick={back} style={{width: "200px"}}>
                    <FontAwesome.FaChevronLeft />
                    Back
                </Button>
                <p>Sorry, instructions not yet added.</p>
            </div>
        );
    }   
}
