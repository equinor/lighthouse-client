import { GroupView } from '@equinor/GroupView';
import { useLocationKey } from '@equinor/hooks';
import { ClientHome, useClientContext } from '@equinor/lighthouse-portal-client';
import { PowerBiViewer } from '@equinor/lighthouse-powerbi-viewer';
import { closeSidesheet } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Apps } from '../../apps/apps';
import { WorkSpace } from '../../Core/WorkSpace/src/WorkSpace';

import { ComponentWrapper } from './ComponentWrapper';
import { AppLoaderWrapper } from '../../fusion-framework/AppLoaderWrapper';

export function ClientRoutes(): JSX.Element {
    const {
        appConfig,
        registry: { apps, appGroups },
        internal: { authProvider },
        settings: { isProduction },
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
                    const api = {
                        ...route,
                        authProvider,
                        appConfig,
                        hasSidesheet: true,
                        isProduction,
                    };
                    return (
                        <Route
                            key={route.shortName + route.groupe}
                            path={`${route.groupe}/${route.shortName}/*`}
                            element={<WorkSpace {...api} />}
                        />
                    );
                }
                if (route.app?.appType === 'PowerBIViewer') {
                    return (
                        <Route key={route.shortName + route.groupe}>
                            <Route
                                key={route.shortName}
                                path={`${route.groupe}/${route.shortName}`}
                                element={<PowerBiViewer {...route} />}
                            />
                        </Route>
                    );
                }

                if (route.app?.appType === 'FusionApp') {
                    return (
                        <Route
                            key={route.shortName + route.groupe}
                            path={`${route.groupe}/${route.shortName}/*`}
                            element={<AppLoaderWrapper appKey={route.shortName} />}
                        />
                    );
                }
                return (
                    <Route
                        key={route.shortName}
                        path={`${route.groupe}/${route.shortName}`}
                        element={<ComponentWrapper {...route} />}
                    />
                );
            })}
        </Routes>
    );
}
