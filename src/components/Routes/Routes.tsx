
import React from "react";
import {
    Redirect, Route, Switch
} from "react-router-dom";
import { useApps } from "../../apps/useApps";
import { HomePage } from "../HomePage/HomePage";




export const Routes = () => {
    const apps = useApps();

    return (
        <Switch>
            <Route exact path={'/'} render={() => <HomePage title="Johan Castberg Dashboard" icon="home" />} />
            {
                apps.map((route, index) => {
                    const Component = route.component || HomePage
                    return (
                        <Route exact key={route.shortName + index} path={`/${route.shortName}`} render={() => <Component {...route} />} />
                    )
                })
            }
            < Route render={(): JSX.Element => <Redirect to="/" />} />
        </Switch>
    );
}