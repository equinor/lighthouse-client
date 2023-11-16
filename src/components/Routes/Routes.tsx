import { GroupView } from '@equinor/GroupView';
import { useLocationKey } from '@equinor/hooks';
import { ClientHome, isProduction, useClientContext } from '@equinor/lighthouse-portal-client';
import { PowerBiViewer } from '@equinor/lighthouse-powerbi-viewer';
import { closeSidesheet } from '@equinor/sidesheet';
import { ReactNode, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Apps } from '../../apps/apps';
import { WorkSpace } from '../../Core/WorkSpace/src/WorkSpace';

import { ComponentWrapper } from './ComponentWrapper';
import { AppLoaderWrapper } from '../../fusion-framework/AppLoaderWrapper';
import { useFramework } from '@equinor/fusion-framework-react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ContextItem } from '@equinor/fusion-framework-module-context';
import EquinorLoader from '../../fusion-framework/EquinorLoader';

type ContextGuardProps = {
    children: ReactNode;
};

const getContextId = () =>
    isProduction()
        ? '3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : '94dd5f4d-17f1-4312-bf75-ad75f4d9572c';

export function ContextGuard({ children }: ContextGuardProps) {
    const context = useFramework().modules.context;
    const { error, isLoading } = useQuery<ContextItem<Record<string, unknown>>>(
        ['context', getContextId()],
        async () => context.setCurrentContextByIdAsync(getContextId()),
        {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: 5,
            retryDelay: 1000,
        }
    );

    if (isLoading) {
        return <EquinorLoader text={'Resolving fusion context'} />;
    }

    if (error) {
        return <div>Failed to resolve fusion context</div>;
    }

    return <>{children}</>;
}

const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function ClientRoutes(): JSX.Element {
    const {
        appConfig,
        registry: { apps, appGroups },
        settings: { isProduction },
    } = useClientContext();

    const currentRoute = useLocationKey();

    useEffect(() => {
        closeSidesheet();
    }, [currentRoute]);

    return (
        <QueryClientProvider client={queryClient}>
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
                                element={
                                    <AppLoaderWrapper
                                        appKey={route.shortName.replace('-new', '')}
                                    />
                                }
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
        </QueryClientProvider>
    );
}
