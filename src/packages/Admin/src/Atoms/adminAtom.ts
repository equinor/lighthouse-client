import { Atom } from '@dbeining/react-atom';
import { SidesheetApi } from '@equinor/sidesheet';
import { Workflow } from '@equinor/Workflow';
import { AdminAccess } from '../Hooks/useAdminAccess';

export interface AdminAtom {
    requestAccess: AdminAccess;
    actions: SidesheetApi;
    app: string;
    workflowOwner: string;
    workflow: Workflow;
}

export const adminAtom = Atom.of<AdminAtom>({
    requestAccess: {
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canUnVoid: false,
        canVoid: false,
    },
    actions: {} as SidesheetApi,
    app: '',
    workflowOwner: '',
    workflow: {} as Workflow,
});