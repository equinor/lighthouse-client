import { createPowerBiViewer } from '@equinor/lighthouse-powerbi-viewer';
import { createWorkSpace, WorkspaceOptions } from '@equinor/WorkSpace';
import { AppConfigResult } from '../../Client/Types/AppConfig';
import { ClientApi } from '../Types/App';
import { AppManifest } from '../Types/AppManifest';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export type ClientBuilderConfig = AppManifest & {
  appConfig: AppConfigResult;
  client: IHttpClient;
  openSidesheet: (SidesheetContent?: React.FC<any> | undefined, props?: any) => void;
  isProduction: boolean;
};

export type WorkspaceViewerOptions<
  T extends Record<PropertyKey, unknown>,
  SideSheetIds extends string
> = Omit<
  WorkspaceOptions<T, SideSheetIds>,
  'viewerId' | 'initialState' | 'dataFactoryCreator' | 'openSidesheet' | 'client'
>;

export function clientApiBuilder(config: ClientBuilderConfig): ClientApi {
  const { shortName, title } = config;

  return {
    ...config,
    createWorkSpace<T extends Record<PropertyKey, unknown>, SideSheetIds extends string = string>(
      options: WorkspaceViewerOptions<T, SideSheetIds>
    ) {
      return createWorkSpace({
        ...options,
        client: config.client,
        initialState: [],
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
