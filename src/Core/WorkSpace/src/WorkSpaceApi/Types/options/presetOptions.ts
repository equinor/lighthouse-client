import { FilterGroup } from '@equinor/filter';
import { WorkspaceTab } from './workspaceTab';
interface TablePreset {}

type GardenPreset = {
    gardenKey: string;
    groupByKeys?: string[];
    customGroupByKeys?: Record<string, unknown>;
};

type FilterPreset = {
    filterGroups: FilterGroup[];
};
type GardenPresetOption = {
    name: string;
    type: Extract<WorkspaceTab, 'garden'>;
    filter: FilterPreset;
    garden: GardenPreset;
};

type TablePresetOption = {
    name: string;
    type: Extract<WorkspaceTab, 'table'>;
    filter: FilterPreset;
    table: TablePreset;
};

export type PresetOption = GardenPresetOption | TablePresetOption;
