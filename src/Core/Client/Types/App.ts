import { AuthenticationProvider } from '@equinor/authentication';
import { PageViewerInstance } from '@equinor/PageViewer';
import { WorkSpaceApi } from '@equinor/WorkSpace';
import { WorkspaceOptions } from '../Service/ClientBuilder';
import { AppConfig } from './AppConfig';
import { AppManifest } from './AppManifest';

type AppType = 'DataViewer' | 'PageView' | 'CustomApp' | 'PowerBI';

export type CustomClientApi = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

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
}
