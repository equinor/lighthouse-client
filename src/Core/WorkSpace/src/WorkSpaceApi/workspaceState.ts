import { Atom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { Filter, PBIOptions } from '@equinor/lighthouse-powerbi';
import { StatusItem } from '@equinor/lighthouse-status-bar';
import { CustomVirtualView, GardenOptions, StatusView } from '@equinor/ParkView';
import { CustomCell, CustomColumn, CustomHeader } from '@equinor/Table';
import React from 'react';
import { FetchQueryOptions, QueryFunction } from 'react-query';
import { TableOptions as ReactTableOptions } from 'react-table';
import { Page } from '../Context/ViewProvider';
import {
    DataSource,
    DataViewerProps,
    HelpPageOptions,
    PresetOption,
    SearchOption,
    ViewOptions,
} from './WorkSpaceTypes';

export interface WorkSpaceState {
    [key: string]: WorkSpaceConfig<unknown>;
}

export type TableOptions<T> = Pick<
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ReactTableOptions<T>,
    'enableSelectRows' | 'onCellClick' | 'setSelected' | 'columnOrder' | 'onSelect'
> & {
    preventAutoGenerateColumns?: boolean;
    objectIdentifierKey: string;
    /** Hide certain columns based on key */
    hiddenColumns?: (keyof T)[];

    /** Change the default header */
    headers?: CustomHeader<T>[];

    /** Change the default cell view */
    customCellView?: CustomCell<T>[];
    /** Add extra columns that are not part of the dataset */
    customColumns?: CustomColumn<T>[];
    /** Height of each row */
    itemSize?: number;
};

export interface Status {
    rating: number;
    statusElement?: JSX.Element;
    status?: string;
}

interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}

//update TreeOptions;;
export interface TreeOptions<T> {
    objectIdentifier: keyof T;
    groupByKeys?: (keyof T)[];
    itemKey: keyof T;
    excludeKeys?: (keyof T)[];
    customViews?: CustomVirtualView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    onGroupeSelect?: (item: T) => string;
    onSelect?: (item: T) => string;
}

export type StatusFunc<T> = (data: T[]) => StatusItem[];

export interface WorkflowEditorOptions {
    endpoint: string;
}

export interface PrefetchQueriesOptions {
    queryKey: string[];
    queryFn: QueryFunction<unknown, string[]>;
    options?: FetchQueryOptions<unknown, unknown, unknown, string[]> | undefined;
}

export type WorkspaceTab = 'tree' | 'table' | 'garden' | 'analytics' | 'gantt' | 'editor' | 'help';

export interface WorkSpaceConfig<T> {
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
}

export interface PowerBiOptions {
    reportURI: string;
    filter?: Filter[];
    options?: PBIOptions;
    pages: Page[];
}

export interface TimeLineOptions { }

export function createWorkSpaceGlobalState(defaultState: WorkSpaceState): Atom<WorkSpaceState> {
    return Atom.of(defaultState);
}

export const CoreContext = createWorkSpaceGlobalState({});

export function getWorkSpaceContext(): Atom<WorkSpaceState> {
    return CoreContext;
}
