import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Footer from './Footer';
import GameContainer from '../containers/GameContainer';
import MenuContainer from '../containers/MenuContainer';

const App = () => {
    const styles = {
        minWidth: "800px",
        padding: "0 0 100px", 
        position: "relative"
    };
    return (
        <BrowserRouter>
            <div className="container" style={styles}>
                <div className="well">
                    <div className="title" key="title">Checkers</div>
                    <Switch>
                        <Route path="/menu" exact component={MenuContainer} />
                        <Route path="/play" component={GameContainer} />
                        <Redirect to="/menu" />
                    </Switch>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
export default App;