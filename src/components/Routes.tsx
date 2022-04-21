import React from "react";
import Loadable from "react-loadable";
import { Redirect, Route, Switch } from "react-router-dom";
import MenuContainer from "../components/Menu/MenuContainer";
import Loading from "./Loading";

const AsyncGameContainer = Loadable({
    loader: () => import("./Game/GameContainer"),
    loading: Loading
});

const AsyncHowToPlay = Loadable({
    loader: () => import("./HowToPlay/HowToPlay"),
    loading: Loading
});

const Routes = () => (
    <Switch>
        <Route path="/menu" exact={true} component={MenuContainer} />
        <Route path="/play/:index" component={AsyncGameContainer} />
        <Route path="/howtoplay" component={AsyncHowToPlay} />
        <Redirect to="/menu" />
    </Switch>
);
export default Routes;
