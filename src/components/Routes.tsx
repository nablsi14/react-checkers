import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import GameContainer from '../containers/GameContainer';
import MenuContainer from '../containers/MenuContainer';
import HowToPlay from './HowToPlay';

const Routes = () => (
    <Switch>
        <Route path="/menu" exact={ true } component={ MenuContainer } />
        <Route path="/play" component={ GameContainer } />
        <Route path="/howtoplay" component={ HowToPlay } />
        <Redirect to="/menu" />
    </Switch>
);

export default Routes;
