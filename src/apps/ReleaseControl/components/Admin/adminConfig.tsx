import { AdminOptions } from '@equinor/WorkSpace';
import { Admin } from '@equinor/Admin';
import { checkIfReleaseControlAdmin } from '@equinor/Workflow';

export const adminConfig: AdminOptions = { app: 'release', component: getAdminPage(), isAdminValidator: ()=>checkIfReleaseControlAdmin('workflows') };

export function getAdminPage(): JSX.Element {
    return <Admin app={'releasecontrol'} workflowOwner={'ReleaseControl'} />;
}
