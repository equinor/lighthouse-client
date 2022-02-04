import { ColDef } from '@ag-grid-enterprise/all-modules';
import { Atom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';

import React from 'react';
import {
    CustomView,
    GardenOptions,
    StatusView,
} from '../../../../components/ParkView/Models/gardenOptions';
import { Filter } from '../../../../modules/powerBI/src/models/filter';
import { StatusItem } from '../../../../packages/StatusBar';
import { DataSource, DataViewerProps, ViewOptions } from './WorkSpaceTypes';

export interface WorkSpaceState {
    [key: string]: WorkSpaceConfig<unknown>;
}

export interface ColumnDefintion<T> extends Omit<ColDef, 'field'> {
    /**Which field to target, you can reference the same field multiple times to make calculated fields */
    field: keyof T;
}

export interface TableOptions<T> {
    /**Controls the order and config of a column in the table */
    columnDefinition: ColumnDefintion<T>[];
    onSelect?: (data: T) => void;
}

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
    groupByKeys?: (keyof T)[];
    itemKey: keyof T;
    excludeKeys?: (keyof T)[];
    customViews?: CustomView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    onSelect?: (item: T) => void;
}

export interface PowerBiOptions {
    reportId: string;
    filterOptions?: Filter[];
}

export type StatusFunc<T> = (data: T[]) => StatusItem[];

export interface WorkflowEditorOptions {
    endpoint: string;
}

export interface WorkSpaceConfig<T> {
    name: string;
    dataSource?: DataSource<T>;
    validator?: (data: unknown[]) => T[];
    viewComponent?: React.FC<DataViewerProps<T>>;
    viewOptions?: ViewOptions<T>;
    filterOptions?: FilterOptions<T>;
    tableOptions?: TableOptions<T>;
    treeOptions?: TreeOptions<T>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<T>;
    analyticsOptions?: AnalyticsOptions<T>;
    statusFunc?: StatusFunc<T>;
    powerBiOptions?: any;
    workflowEditorOptions?: WorkflowEditorOptions;
}

export function createWorkSpaceGlobalState(defaultState: WorkSpaceState): Atom<WorkSpaceState> {
    return Atom.of(defaultState);
}

export const CoreContext = createWorkSpaceGlobalState({});

export function getWorkSpaceContext(): Atom<WorkSpaceState> {
    return CoreContext;
}
