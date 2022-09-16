import { FilterGroup } from '@equinor/filter';
import { WorkspaceTab } from '../../../WorkSpaceApi/Types/options';
import { GardenPayload } from './gardenPayload';

export type WorkspaceBookmarkPayload = {
    activeTab: WorkspaceTab;
    garden: GardenPayload;
    filter: FilterGroup[];
};
