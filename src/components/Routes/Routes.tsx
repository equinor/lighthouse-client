import { Redirect, Route, Switch } from 'react-router-dom';
import { useApps } from '../../apps/useApps';
import useClientContext from '../../context/clientContext';
import { HomePage } from '../HomePage/HomePage';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function Routes(): JSX.Element {
    const { appConfig, authProvider } = useClientContext();
    const apps = useApps(authProvider, appConfig);
    console.log('rendered!');
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
