import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { AppManifest, useClientContext } from '@equinor/lighthouse-portal-client';
import ErrorFallback from '../../Core/ErrorBoundary/Components/ErrorFallback';
import { ModelViewerContextProvider } from '../../packages/ModelViewer/context/modelViewerContext';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function ComponentWrapper(route: AppManifest): JSX.Element {
  const { appConfig, internal, settings } = useClientContext();
  const Component = route.app?.component || DefaultRouteComponent;
  const api = {
    ...route,
    appConfig,
    isProduction: settings.isProduction,
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} routeName={route.title}>
      <ModelViewerContextProvider>
        <Component {...api} />
      </ModelViewerContextProvider>
    </ErrorBoundary>
  );
}
