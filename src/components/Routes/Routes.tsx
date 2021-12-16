import { Route, Routes } from 'react-router-dom';
import { Apps, Manifests } from '../../apps/apps';
import useClientContext from '../../context/clientContext';
import PageView from '../../Core/PageViewer';
import { DataView } from '../CompletionView/src/DataView';
import { HomePage } from '../HomePage/HomePage';
import { ComponentWrapper } from './ComponentWrapper';
import { GroupComponentWrapper } from './GroupComponentWrapper';

interface ClientRoutesProps {
    manifests: Manifests;
}

export function ClientRoutes({ manifests: { apps, appGroups } }: ClientRoutesProps): JSX.Element {
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
                if (route.app?.appType === 'PageView') {
                    return (
                        <>
                            <Route
                                key={route.shortName}
                                path={`${route.groupe.toString()}/${route.shortName}`}
                                element={<PageView />}
                            />
                            <Route
                                key={route.shortName + 'id'}
                                path={`${route.groupe.toString()}/${route.shortName}/:id`}
                                element={<PageView />}
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
