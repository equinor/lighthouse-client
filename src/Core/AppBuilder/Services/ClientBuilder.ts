import { AuthenticationProvider } from '@equinor/authentication';
import { createDataFactory } from '@equinor/DataFactory';
import { AppConfig } from '@equinor/lighthouse-conf';
import { createPageViewer, PageViewerOptions as PageOptions } from '@equinor/PageViewer';
import { createWorkSpace, ViewerOptions } from '@equinor/WorkSpace';
import { ClientApi } from '../Types/App';
import { AppManifest } from '../Types/Manifest';

export interface ClientBuilderConfig extends AppManifest {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
}

export type WorkspaceOptions<T> = Omit<
    ViewerOptions<T>,
    'viewerId' | 'initialState' | 'dataFactoryCreator'
>;

export type PageViewerOptions = Omit<PageOptions, 'viewerId'>;

export function clientApiBuilder(config: ClientBuilderConfig): ClientApi {
    const { shortName, title } = config;
    return {
        ...config,
        createWorkSpace<T>(options: WorkspaceOptions<T>) {
            return createWorkSpace({
                ...options,
                initialState: [],
                viewerId: shortName,
                dataFactoryCreator: createDataFactory,
            });
        },
        createPageViewer() {
            return createPageViewer({
                title,
                viewerId: shortName,
            });
        },
    };
}
