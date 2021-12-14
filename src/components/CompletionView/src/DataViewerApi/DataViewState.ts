import { Atom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { CustomCell, CustomColumn, CustomHeader } from '@equinor/Table';
import React from 'react';
import { Filter } from '../../../../modules/powerBI/src/models/filter';
import { StatusItem } from '../../../../packages/StatusBar';
import { DataSet } from '../../../ParkView/Models/data';
import { DataSource, DataViewerProps, ViewOptions } from './DataViewerTypes';
import { TableOptions as ReactTableOptions } from 'react-table';
export interface DataViewState {
    [key: string]: ViewConfig<unknown>;
}

export interface FilterOptions<T> {
    excludeKeys?: (keyof T)[];
    typeMap?: Partial<Record<keyof T, string>>;
    groupValue?: Record<string, (item: T) => string>;
    customRender?: Record<keyof T | string, React.FC<T>>;
}

export type TableOptions<T> = Pick<
    //@ts-ignore
    ReactTableOptions<T>,
    'enableSelectRows' | 'onCellClick' | 'setSelected'
> & {
    objectIdentifierKey: string;

    /** Hide certain columns based on key */
    hiddenColumns?: (keyof T)[];

    /** Change the default header */
    headers?: CustomHeader<T>[];

    /** Change the default cell view */
    customCellView?: CustomCell<T>[];
    /** Add extra columns that are not part of the dataset */
    customColumns?: CustomColumn<T>[];
};

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
    tableOptions?: TableOptions<T>;
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
