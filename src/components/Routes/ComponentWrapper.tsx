import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { AppManifest, useClientContext } from '@equinor/portal-client';
import ErrorFallback from '../../Core/ErrorBoundary/Components/ErrorFallback';
import { ModelViewerContextProvider } from '../../packages/ModelViewer/context/modelViewerContext';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function ComponentWrapper(route: AppManifest): JSX.Element {
    const { appConfig, internal } = useClientContext();
    const Component = route.app?.component || DefaultRouteComponent;
    const api = { ...route, authProvider: internal.authProvider, appConfig };
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={route.title}>
            <ModelViewerContextProvider>
                <Component {...api} />
            </ModelViewerContextProvider>
        </ErrorBoundary>
    );
}
