import { Atom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import React from 'react';
import { Filter } from '../../../../modules/powerBI/src/models/filter';
import { StatusItem } from '../../../../packages/StatusBar';
import { HeaderData } from '../../../DataTable/Utils/generateHeaderKeys';
import { DataSet } from '../../../ParkView/Models/data';
import { DataSource, DataViewerProps, ViewOptions } from './DataViewerTypes';

export interface DataViewState {
    [key: string]: ViewConfig<unknown>;
}

export interface FilterOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
}

export interface TableOptions {
    objectIdentifierKey: string;
    headers?: HeaderData[];
}

export interface Status {
    rating: number;
    statusElement?: JSX.Element;
    status?: string;
}

interface StatusView<T> {
    statusItemFunc: (data: T) => Status;
    statusGroupFunc?: (group: DataSet<T>) => Status;
    shouldAggregate: boolean;
}

interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}

interface CustomView<T> {
    customItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    customGroupView?: React.FC<{ data: DataSet<any>; onClick: () => void }>;
}

//update TreeOptions;;
export interface TreeOptions<T> {
    groupByKeys?: (keyof T)[];
    itemKey: keyof T;
    excludeKeys?: (keyof T)[];
    customViews?: CustomView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
}

export interface GardenOptions<T> {
    gardenKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    excludeKeys?: (keyof T)[];
    customViews?: CustomView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
}

export interface PowerBiOptions {
    reportId: string;
    filterOptions?: Filter[];
}

export type StatusFunc<T> = (data: T[]) => StatusItem[];

export interface DataViewSideSheetOptions<T> {
    CustomRender?: React.FC<{ item: T; onClose: () => void }>;
}

export interface VisualEditorOptions {
    endpoint: string;
}

export interface ViewConfig<T> {
    name: string;
    dataSource?: DataSource<T>;
    validator?: (data: unknown[]) => T[];
    viewComponent?: React.FC<DataViewerProps<T>>;
    viewOptions?: ViewOptions<T>;
    filterOptions?: FilterOptions<T>;
    tableOptions?: TableOptions;
    treeOptions?: TreeOptions<T>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<T>;
    analyticsOptions?: AnalyticsOptions<T>;
    statusFunc?: StatusFunc<T>;
    powerBiOptions?: any;
    dataViewSideSheetOptions?: DataViewSideSheetOptions<T>;
    visualEditorOptions?: VisualEditorOptions;
}

export function createGlobalState(defaultState: DataViewState): Atom<DataViewState> {
    return Atom.of(defaultState);
}

export const CoreContext = createGlobalState({});

export function getContext(): Atom<DataViewState> {
    return CoreContext;
}
