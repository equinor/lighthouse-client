import { FilterGroup } from '@equinor/filter';
import { WorkspaceTab } from '../../../WorkSpaceApi/workspaceState';
import { GardenPayload } from './gardenPayload';

export type WorkspaceBookmarkPayload = {
    activeTab: WorkspaceTab;
    garden: GardenPayload;
    filter: FilterGroup[];
};
