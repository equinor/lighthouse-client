import { AuthenticationProvider } from '@equinor/authentication';
import { Factory } from '@equinor/DataFactory';
import { createPageViewer, PageViewerOptions as PageOptions } from '@equinor/PageViewer';
import { createWorkSpace, ViewerOptions } from '@equinor/WorkSpace';
import { AppConfigResult } from '../../Client/Types/AppConfig';
import { ClientApi } from '../Types/App';
import { AppManifest } from '../Types/AppManifest';

export interface ClientBuilderConfig extends AppManifest {
    appConfig: AppConfigResult;
    authProvider: AuthenticationProvider;
    openSidesheet: (SidesheetContent?: React.FC<any> | undefined, props?: any) => void;
    createDataFactory: (factory: Factory) => void;
}

export type WorkspaceOptions<T> = Omit<
    ViewerOptions<T>,
    'viewerId' | 'initialState' | 'dataFactoryCreator' | 'openSidesheet'
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
                dataFactoryCreator: config.createDataFactory,
                openSidesheet: config.openSidesheet,
            });
        },
        createPageViewer() {
            return createPageViewer({
                title,
                viewerId: shortName,
                openSidesheet: config.openSidesheet,
            });
        },
    };
}
