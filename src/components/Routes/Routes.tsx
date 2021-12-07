import { Redirect, Route, Switch } from 'react-router-dom';
import { useApps } from '../../apps/useApps';
import useClientContext from '../../context/clientContext';
import { HomePage } from '../HomePage/HomePage';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function Routes(): JSX.Element {
    const apps = useApps();
    const { appConfig, authProvider } = useClientContext();

    return (
        <Switch>
            <Route
                exact
                path={'/'}
                render={() => <HomePage title="Johan Castberg Dashboard" icon="home" />}
            />
            {apps.map((route) => {
                return (
                    <Route
                        exact
                        key={route.shortName}
                        path={`/${route.shortName}`}
                        render={() => {
                            const Component = route.app?.component || DefaultRouteComponent;
                            route.app?.setup &&
                                route.app.setup({
                                    ...route,
                                    appConfig,
                                    authProvider,
                                });

                            const api = { ...route, authProvider, appConfig };

                            return <Component {...api} />;
                        }}
                    />
                );
            })}
            <Route render={(): JSX.Element => <Redirect to="/" />} />
        </Switch>
    );
}
