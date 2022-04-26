import { AuthenticationProvider } from '@equinor/authentication';
import { PowerBIViewerInstance } from '@equinor/lighthouse-powerbi-viewer';
import { PageViewerInstance } from '@equinor/PageViewer';
import { WorkSpaceApi } from '@equinor/WorkSpace';
import { WorkspaceOptions } from '../Service/ClientBuilder';
import { AppConfig } from './AppConfig';
import { AppManifest } from './AppManifest';

// Todo cleanup app types and  maybe create another system: look at fusion manifest for this.
type AppType = 'Workspace' | 'PageView' | 'CustomApp' | 'PowerBI' | 'PowerBIViewer';

export type CustomClientApi = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export interface App {
    appType?: AppType;
    setup?: (api: ClientApi) => void;
    component?: React.FC<CustomClientApi>;
}

export interface ClientApi extends AppManifest {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
    createWorkSpace<T>(options: WorkspaceOptions<T>): WorkSpaceApi<T>;
    createPageViewer(): PageViewerInstance;
    createPowerBiViewer(): PowerBIViewerInstance;
    hasSidesheet?: boolean;
}
