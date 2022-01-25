import React from 'react';
import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
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

export interface GardenOptions<T> {
    gardenKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    customGroupByKeys?: Record<string, unknown>;
    fieldSettings?: FieldSettings<T, string>;
    customViews?: CustomView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    onSelect?: (item: T) => void;
}
