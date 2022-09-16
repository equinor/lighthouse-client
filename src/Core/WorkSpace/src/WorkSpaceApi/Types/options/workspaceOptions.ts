import { OpenSidesheetFunc } from '@equinor/sidesheet';
import { WorkspaceSideSheet } from '../../Functions/setupWorkspaceSidesheet';
import { WorkspaceTab } from './workspaceTab';

export interface WorkspaceOptions<
    T extends Record<PropertyKey, unknown>,
    SideSheetId extends string = string
> {
    initialState: T[];
    objectIdentifier: keyof T;
    viewerId: string;
    defaultTab?: WorkspaceTab;
    openSidesheet: OpenSidesheetFunc;
    customSidesheetOptions?: WorkspaceSideSheet<T, SideSheetId>;
    customGroupeSidesheet?: WorkspaceSideSheet<any, string>;
}
