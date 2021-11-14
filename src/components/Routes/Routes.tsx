
import React from "react";
import {
    Redirect, Route, Switch
} from "react-router-dom";
import { useApps } from "../../apps/useApps";
import useClientContext from "../../context/clientContext";
import { HomePage } from "../HomePage/HomePage";
import { DefaultRouteComponent } from "./defaultRouteComponent";




export const Routes = () => {
    const apps = useApps();
    const { appConfig, authProvider } = useClientContext();


    return (
        <Switch>
            <Route exact path={'/'} render={() => <HomePage title="Johan Castberg Dashboard" icon="home" />} />
            {
                apps.map((route, index) => {

                    return (
                        <Route exact key={route.shortName + index} path={`/${route.shortName}`} render={() => {
                            const Component = route.app?.component || DefaultRouteComponent
                            route.app?.setup &&
                                route.app.setup({
                                    ...route,
                                    appConfig,
                                    authProvider
                                });

                            const api = { ...route, authProvider, appConfig }

                            return <Component {...api} />
                        }
                        } />
                    )
                })
            }
            < Route render={(): JSX.Element => <Redirect to="/" />} />
        </Switch>
    );
}