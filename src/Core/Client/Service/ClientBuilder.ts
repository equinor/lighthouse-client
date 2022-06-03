import { AuthenticationProvider } from '@equinor/authentication';
import { createPowerBiViewer } from '@equinor/lighthouse-powerbi-viewer';
import { createPageViewer, PageViewerOptions as PageOptions } from '@equinor/PageViewer';
import { createWorkSpace, WorkspaceOptions } from '@equinor/WorkSpace';
import { AppConfigResult } from '../../Client/Types/AppConfig';
import { ClientApi } from '../Types/App';
import { AppManifest } from '../Types/AppManifest';

export interface ClientBuilderConfig extends AppManifest {
    appConfig: AppConfigResult;
    authProvider: AuthenticationProvider;
    openSidesheet: (SidesheetContent?: React.FC<any> | undefined, props?: any) => void;
    isProduction: boolean;
}

export type WorkspaceViewerOptions<T, SideSheetIds extends string> = Omit<
    WorkspaceOptions<T, SideSheetIds>,
    'viewerId' | 'initialState' | 'dataFactoryCreator' | 'openSidesheet'
>;

export type PageViewerOptions = Omit<PageOptions, 'viewerId'>;

export function clientApiBuilder(config: ClientBuilderConfig): ClientApi {
    const { shortName, title } = config;

    return {
        ...config,
        createWorkSpace<T, SideSheetIds extends string = string>(
            options: WorkspaceViewerOptions<T, SideSheetIds>
        ) {
            return createWorkSpace({
                ...options,
                initialState: [],
                viewerId: shortName,
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
        createPowerBiViewer() {
            return createPowerBiViewer({
                title,
                viewerId: shortName,
            });
        },
    };
}
