import { GroupView } from '@equinor/GroupView';
import { Route, Routes } from 'react-router-dom';
import { Apps, Manifests } from '../../apps/apps';
import useClientContext from '../../context/clientContext';
import PageView from '../../Core/PageViewer';
import { WorkSpace } from '../../Core/WorkSpace/src/WorkSpace';
import { ComponentWrapper } from './ComponentWrapper';

interface ClientRoutesProps {
    manifests: Manifests;
}

export function ClientRoutes({ manifests: { apps, appGroups } }: ClientRoutesProps): JSX.Element {
    const { appConfig, authProvider } = useClientContext();

    return (
        <Routes>
            <Route
                path={'/'}
                element={
                    <GroupView
                        group={{ name: 'Johan Castberg Home', icon: '' }}
                        groups={appGroups}
                        groupeId={'key'}
                    />
                }
            />
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
                        element={<GroupView group={group} links={links} groupeId={key} />}
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
                                element={<WorkSpace {...api} />}
                            />
                            <Route
                                key={route.shortName + 'id'}
                                path={`${route.groupe.toString()}/${route.shortName}/:id`}
                                element={<WorkSpace {...api} />}
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
