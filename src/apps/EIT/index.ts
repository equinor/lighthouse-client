import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
  appApi.createPowerBiViewer().registerFusionPowerBi({
    reportURI: 'pp-eit-analytics',
  });
}
