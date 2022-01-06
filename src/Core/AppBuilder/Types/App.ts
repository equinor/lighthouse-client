import { AuthenticationProvider } from '@equinor/authentication';
import { AppConfig } from '@equinor/lighthouse-conf';
import { PageViewerInstance } from '../../PageViewer/Api/pageViewerApi';
import { WorkSpaceApi } from '../../WorkSpace/src/WorkSpaceApi/WorkSpaceTypes';
import { WorkspaceOptions } from '../Services/ClientBuilder';
import { AppManifest } from './Manifest';

type AppType = 'DataViewer' | 'PageView' | 'CustomApp' | 'PowerBI';

export interface App {
    appType?: AppType;
    setup?: (api: ClientApi) => void;
    component?: React.FC<AppManifest>;
}

export interface ClientApi extends AppManifest {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
    createWorkSpace<T>(options: WorkspaceOptions<T>): WorkSpaceApi<T>;
    createPageViewer(): PageViewerInstance;
}
