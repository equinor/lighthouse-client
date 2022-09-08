import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';

export type DataSet<T extends Record<PropertyKey, unknown>> = {
    groupKey: keyof T;
    value: string;
    subGroups: GardenGroups<T>;
    items: T[];
    isExpanded: boolean;
    count: number;
    subGroupCount: number;
    status?: Status;
    description?: string | undefined;
    depth: number;
};

export type GardenGroups<T extends Record<PropertyKey, unknown>> = DataSet<T>[];
