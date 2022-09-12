import React from 'react';
import { Atom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { GardenOptions } from '@equinor/ParkView';
import {
    DataSource,
    DataViewerProps,
    HelpPageOptions,
    PowerBiOptions,
    PrefetchQueriesOptions,
    PresetOption,
    SearchOption,
    StatusFunc,
    TableOptions,
    TimeLineOptions,
    TreeOptions,
    ViewOptions,
    WorkflowEditorOptions,
    WorkspaceTab,
} from './Types/options';

export interface WorkSpaceState {
    [key: string]: WorkSpaceConfig<Record<PropertyKey, unknown>>;
}

export interface Status {
    rating: number;
    statusElement?: JSX.Element;
    status?: string;
}

export type WorkSpaceConfig<T extends Record<PropertyKey, unknown>> = {
    name: string;
    defaultTab: WorkspaceTab;
    objectIdentifier: string;
    prefetchQueriesOptions?: PrefetchQueriesOptions[];
    onSelect?: (item: T) => void;
    onGroupeSelect?: (item: T) => void;
    dataSource?: DataSource<T>;
    validator?: (data: unknown[]) => T[];
    viewComponent?: React.FC<DataViewerProps<T>>;
    viewOptions?: ViewOptions<T>;
    filterOptions?: FilterOptions<T>;
    tableOptions?: TableOptions<T>;
    treeOptions?: TreeOptions<T>;
    timelineOptions?: TimeLineOptions;
    gardenOptions?: GardenOptions<T>;
    analyticsOptions?: AnalyticsOptions<T>;
    statusFunc?: StatusFunc<T>;
    powerBiOptions?: PowerBiOptions;
    workflowEditorOptions?: WorkflowEditorOptions;
    presetOptions?: PresetOption[];
    searchOptions?: SearchOption<T>[];
    helpPageOptions?: HelpPageOptions;
};

export function createWorkSpaceGlobalState(defaultState: WorkSpaceState): Atom<WorkSpaceState> {
    return Atom.of(defaultState);
}

export const CoreContext = createWorkSpaceGlobalState({});

export function getWorkSpaceContext(): Atom<WorkSpaceState> {
    return CoreContext;
}
