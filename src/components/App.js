import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Footer from './Footer';
import GameContainer from '../containers/GameContainer';
import HowToPlay from './HowToPlay';
import MenuContainer from '../containers/MenuContainer';

const App = () => {
    const styles = {
        minWidth: "800px",
        padding: "0 0 100px", 
        position: "relative"
    };
    const title_styles = {
        fontFamily: "Roboto, sans-serif",
        fontSize: "50px",
        textAlign: "center"
    };
    return (
        <BrowserRouter>
            <div className="container" style={styles}>
                <div className="well">
                    <div style={title_styles}>Checkers</div>
                    <Switch>
                        <Route path="/menu" exact component={MenuContainer} />
                        <Route path="/play" component={GameContainer} />
                        <Route path="/howtoplay" component={HowToPlay} />
                        <Redirect to="/menu" />
                    </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
export default App;