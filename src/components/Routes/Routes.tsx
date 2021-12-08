import { Route, Routes } from 'react-router-dom';
import { Apps } from '../../apps/apps';
import { useApps } from '../../apps/useApps';
import useClientContext from '../../context/clientContext';
import { DataView } from '../CompletionView/src/DataView';
import { HomePage } from '../HomePage/HomePage';
import { ComponentWrapper } from './ComponentWrapper';
import { GroupComponentWrapper } from './GroupComponentWrapper';

export function ClientRoutes(): JSX.Element {
    const { apps, appGroups } = useApps();
    const { appConfig, authProvider } = useClientContext();

    return (
        <Routes>
            <Route path={'/'} element={<HomePage title="Johan Castberg Dashboard" icon="home" />} />
            {Object.keys(appGroups).map((key) => {
                const group = appGroups[key];
                const links = apps.filter((app) => {
                    if (Array.isArray(app.groupe)) {
                        return app.groupe.includes(key as Apps);
                    }
                    return app.groupe === (key as Apps);
                });
                return (
                    <Route
                        key={key}
                        path={`${key}`}
                        element={<GroupComponentWrapper {...group} links={links} groupeId={key} />}
                    />
                );
            })}
            {apps.map((route) => {
                route.app?.setup &&
                    route.app.setup({
                        ...route,
                        appConfig,
                        authProvider,
                    });

                //  TODO extend this with new apptype
                if (route.app?.appType === 'DataViewer') {
                    const api = { ...route, authProvider, appConfig };
                    return (
                        <>
                            <Route
                                key={route.shortName}
                                path={`${route.groupe.toString()}/${route.shortName}`}
                                element={<DataView {...api} />}
                            />
                            <Route
                                key={route.shortName + 'id'}
                                path={`${route.groupe.toString()}/${route.shortName}/:id`}
                                element={<DataView {...api} />}
                            />
                        </>
                    );
                }
                return (
                    <Route
                        key={route.shortName}
                        path={`${route.groupe.toString()}/${route.shortName}`}
                        element={<ComponentWrapper {...route} />}
                    />
                );
            })}
        </Routes>
    );
}
