import { GroupView } from '@equinor/GroupView';
import { ClientHome, useClientContext } from '@equinor/portal-client';
import { closeSidesheet } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Apps } from '../../apps/apps';
import PageView from '../../Core/PageViewer';
import { WorkSpace } from '../../Core/WorkSpace/src/WorkSpace';
import { useLocationKey } from '../../packages/Filter/Hooks/useLocationKey';
import { ComponentWrapper } from './ComponentWrapper';

export function ClientRoutes(): JSX.Element {
    const {
        appConfig,
        registry: { apps, appGroups },
        internal: { authProvider },
    } = useClientContext();

    const currentRoute = useLocationKey();

    useEffect(() => {
        closeSidesheet();
    }, [currentRoute]);

    return (
        <Routes>
            <Route path={'/'} element={<ClientHome />} />
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
                if (route.app?.appType === 'Workspace') {
                    const api = { ...route, authProvider, appConfig };
                    return (
                        <Route key={route.shortName + route.groupe}>
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
                        </Route>
                    );
                }
                if (route.app?.appType === 'PageView') {
                    return (
                        <Route key={route.shortName + route.groupe}>
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
                        </Route>
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
