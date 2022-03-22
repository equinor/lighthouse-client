import React from 'react';
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
    columnKey: string;
}

export interface CustomView<T> {
    customItemView?: React.FC<CustomItemView<T>>;
    customGroupView?: React.FC<CustomGroupView<T>>;
    customHeaderView?: React.FC<CustomHeaderView<T>>;
    customGroupByView?: React.FC;
}

export interface GardenOptions<T> {
    gardenKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    customGroupByKeys?: Record<string, unknown>;
    customStateFunction?: (data: T[]) => Record<string, unknown>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    fieldSettings?: FieldSettings<T, string>;
    customViews?: CustomView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
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
