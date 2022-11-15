import { AdminOptions } from '@equinor/WorkSpace';
import { Admin } from '@equinor/Admin';

export const adminConfig: AdminOptions = { app: 'release', component: getAdminPage() };

export function getAdminPage(): JSX.Element {
    return <Admin app={'releasecontrol'} workflowOwner={'ReleaseControl'} />;
}
