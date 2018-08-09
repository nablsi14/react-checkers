import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GameContainer from "../components/Game/GameContainer";
import MenuContainer from "../components/Menu/MenuContainer";
import HowToPlay from "./HowToPlay/HowToPlay";

const Routes = () => (
    <Switch>
        <Route path="/menu" exact={true} component={MenuContainer} />
        <Route path="/play/:index" component={GameContainer} />
        <Route path="/howtoplay" component={HowToPlay} />
        <Redirect to="/menu" />
    </Switch>
);

export default Routes;
