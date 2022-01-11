import { AppManifest } from '@equinor/app-builder';
import useClientContext from '../../context/clientContext';
import { DefaultRouteComponent } from './DefaultRouteComponent';

export function ComponentWrapper(route: AppManifest): JSX.Element {
    const { appConfig, authProvider } = useClientContext();
    const Component = route.app?.component || DefaultRouteComponent;
    const api = { ...route, authProvider, appConfig };

    return <Component {...api} />;
}
