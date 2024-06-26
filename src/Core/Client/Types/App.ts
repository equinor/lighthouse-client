import { PowerBIViewerInstance } from '@equinor/lighthouse-powerbi-viewer';
import { WorkSpaceApi } from '@equinor/WorkSpace';
import { WorkspaceViewerOptions } from '../Service/ClientBuilder';
import { AppConfig } from './AppConfig';
import { AppManifest } from './AppManifest';

// Todo cleanup app types and  maybe create another system: look at fusion manifest for this.
type AppType = 'Workspace' | 'CustomApp' | 'PowerBI' | 'PowerBIViewer' | 'FusionApp';

export type CustomClientApi = Omit<ClientApi, 'createWorkSpace' | 'createPowerBiViewer'>;

export type App = {
  appType?: AppType;
  setup?: (api: ClientApi) => void;
  component?: React.FC<CustomClientApi>;
  appkey?: string;
};

export type ClientApi = AppManifest & {
  appConfig: AppConfig;
  createWorkSpace<T extends Record<PropertyKey, unknown>, SideSheetId extends string = string>(
    options: WorkspaceViewerOptions<T, SideSheetId>
  ): WorkSpaceApi<T>;
  createPowerBiViewer(): PowerBIViewerInstance;
  isProduction: boolean;
  hasSidesheet?: boolean;
};
