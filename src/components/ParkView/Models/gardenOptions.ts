import React, { MemoExoticComponent } from 'react';
import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { DataSet, Data } from './data';
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
    garden: Data<T>;
    columnKey: string;
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
    customGroupByView: React.FC;
}

export interface GardenOptions<T> {
    gardenKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    customGroupByKeys?: Record<string, unknown>;
    customStateFunction?: (data: T[]) => Record<string, unknown>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    fieldSettings?: FieldSettings<T, string>;
    type?: 'virtual' | 'normal';
    customViews?: CustomView<T> | CustomVirtualView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    itemWidth?: number;
    rowHeight?: number;
    highlightColumn?: string;
    onSelect?: (item: T) => void;
}
