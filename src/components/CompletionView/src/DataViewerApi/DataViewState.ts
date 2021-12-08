import { Atom } from '@dbeining/react-atom';
import React from 'react';
import { Filter } from '../../../../modules/powerBI/src/models/filter';
import { HeaderData } from '../../../DataTable/Utils/generateHeaderKeys';
import { DataSet } from '../../../Garden/Models/data';
import { Cell, CustomColumn } from '../../../Table/types';
import { DataFetcher, DataViewerProps, ViewOptions } from './DataViewerTypes';

export interface DataViewState {
    [key: string]: ViewConfig<unknown>;
}

export interface TreeOptions<T> {
    rootNode: keyof T;
    groupByKeys: (keyof T)[];
}
export interface FilterOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
}

export interface TableOptions<T> {
    objectIdentifierKey: string;
    headers?: HeaderData[];
    enableSelectRows?: boolean;
    onCellClick?: (cell: Cell) => void;
    hiddenColumns?: (keyof T)[];
    customColumns?: CustomColumn[];
}
export interface GardenOptions<T> {
    groupeKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    excludeKeys?: (keyof T)[];
    customItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    statusFunc?: (data: T) => string;
    customGroupView?: React.FC<{ data: DataSet<any>; onClick: () => void }>;
}

export interface PowerBiOptions {
    reportId: string;
    filterOptions?: Filter[];
}

export interface ViewConfig<T> {
    name: string;
    dataFetcher?: DataFetcher<T>;
    validator?: (data: unknown[]) => T[];
    viewComponent?: React.FC<DataViewerProps<T>>;
    viewOptions?: ViewOptions<T>;
    filterOptions?: FilterOptions<T>;
    tableOptions?: TableOptions<T>;
    treeOptions?: TreeOptions<T>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<T>;
    analyticsOptions?: any;
    powerBiOptions?: any;
}

export function createGlobalState(defaultState: DataViewState): Atom<DataViewState> {
    return Atom.of(defaultState);
}

export const CoreContext = createGlobalState({});

export function getContext() {
    return CoreContext;
}
