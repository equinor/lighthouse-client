import { AppManifest } from '@equinor/app-builder';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { useClientContext } from '@equinor/portal-client';
import ErrorFallback from '../../Core/ErrorBoundary/Components/ErrorFallback';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function ComponentWrapper(route: AppManifest): JSX.Element {
    const { appConfig, authProvider } = useClientContext();
    const Component = route.app?.component || DefaultRouteComponent;
    const api = { ...route, authProvider, appConfig };
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={route.title}>
            <Component {...api} />
        </ErrorBoundary>
    );
}
