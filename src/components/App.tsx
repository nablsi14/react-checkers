import React, { CSSProperties } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import GameContainer from '../containers/GameContainer';
import MenuContainer from '../containers/MenuContainer';
import Footer from './Footer';
import HowToPlay from './HowToPlay';

const styles: CSSProperties = {
    minWidth: "800px",
    padding: "0 0 100px", 
    position: "relative"
};
const titleStyles: CSSProperties = {
    fontFamily: "Roboto, sans-serif",
    fontSize: "50px",
    textAlign: "center"
};

const App = () => (
    <BrowserRouter>
        <Container style={ styles }>
            <div className="well">
                <div style={ titleStyles }>Checkers</div>
                <Switch>
                    <Route path="/menu" exact={ true } component={ MenuContainer } />
                    <Route path="/play" component={ GameContainer } />
                    <Route path="/howtoplay" component={ HowToPlay } />
                    <Redirect to="/menu" />
                </Switch>
            </div>
            <Footer />
        </Container>
    </BrowserRouter>
);
export default App;