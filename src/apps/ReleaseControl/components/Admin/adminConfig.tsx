import { AdminOptions } from '@equinor/WorkSpace';
import { Admin } from '@equinor/Admin';
import { checkIfReleaseControlAdmin } from '@equinor/Workflow';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const adminConfig: AdminOptions = {
  app: 'release',
  component: getAdminPage(),
  isAdminValidator: (client: IHttpClient) => checkIfReleaseControlAdmin('workflows', client),
};

export function getAdminPage(): JSX.Element {
  return <Admin app={'releasecontrol'} workflowOwner={'ReleaseControl'} />;
}
