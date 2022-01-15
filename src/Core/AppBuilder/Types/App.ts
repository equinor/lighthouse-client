import { AuthenticationProvider } from '@equinor/authentication';
import { AppConfig } from '@equinor/client';
import { PageViewerInstance } from '../../PageViewer/Api/pageViewerApi';
import { WorkSpaceApi } from '../../WorkSpace/src/WorkSpaceApi/WorkSpaceTypes';
import { WorkspaceOptions } from '../Services/ClientBuilder';
import { AppManifest } from './Manifest';

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
