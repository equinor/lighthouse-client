import React, { MemoExoticComponent } from 'react';
import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { DataSet, GardenGroups } from './data';
import { FieldSettings } from './fieldSettings';

export interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}

export interface StatusView<T> {
    statusItemFunc: (data: T) => Status;
    statusGroupFunc?: (group: DataSet<T>) => Status;
    shouldAggregate: boolean;
}

export interface CustomItemView<T> {
    data: T;
    itemKey: string;
    onClick: () => void;
    columnExpanded: boolean;
}

export interface CustomGroupView<T> {
    data: DataSet<T>;
    onClick: () => void;
    columnExpanded: boolean;
}

export interface CustomHeaderView<T> {
    garden: GardenGroups<T>;
    columnIndex: number;
    groupByKey?: string;
}

export interface CustomView<T> {
    customItemView?: React.FC<CustomItemView<T>>;
    customGroupView?: React.FC<CustomGroupView<T>>;
    customHeaderView?: React.FC<CustomHeaderView<T>>;
    customGroupByView?: React.FC;
}
export interface CustomVirtualView<T> {
    customItemView?: MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
    customGroupView?: React.FC<CustomGroupView<T>>;
    customHeaderView?: MemoExoticComponent<(args: CustomHeaderView<T>) => JSX.Element>;
    customGroupByView?: React.FC;
}

export interface GardenOptions<T> {
    gardenKey: keyof T;
    itemKey: keyof T;
    /**  Use virtual if garden has more than 3000 DOM elements */
    type: 'virtual' | 'normal';
    groupByKeys?: (keyof T)[];
    customGroupByKeys?: Record<string, unknown>;
    customStateFunction?: (data: T[]) => Record<string, unknown>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    fieldSettings?: FieldSettings<T, string>;
    /** Wrap custom components with memo if type: "virtual". */
    customViews?: CustomView<T> | CustomVirtualView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    itemWidth?: (garden: GardenGroups<T>, key: string) => number;
    rowHeight?: number;
    highlightColumn?: (
        groupBy: string,
        customGroupByKeys: Record<string, unknown>
    ) => string | undefined;
    intercepters?: GardenDataIntercepters<T>;
    onSelect?: (item: T) => void;
}

export type PreGroupByFiltering<T = unknown> = (arr: T[], groupByKey: string) => T[];
export type PostGroupBySorting<T = unknown> = (
    data: GardenGroups<T>,
    keys: (keyof T)[]
) => GardenGroups<T>;

export interface GardenDataIntercepters<T> {
    preGroupFiltering?: PreGroupByFiltering<T>;
    postGroupSorting?: PostGroupBySorting<T>;
}
