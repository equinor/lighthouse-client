import React, { MemoExoticComponent, MutableRefObject } from 'react';
import { DataSet, GardenGroups } from './data';
import { FieldSettings } from './fieldSettings';

export interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}

export type Status = {
    rating: number;
    statusElement?: JSX.Element;
    status?: string;
};

export type StatusView<T extends Record<PropertyKey, unknown>> = {
    statusItemFunc: (data: T) => Status;
    statusGroupFunc?: (group: DataSet<T>) => Status;
    shouldAggregate: boolean;
};

export type CustomItemView<T extends Record<PropertyKey, unknown>> = {
    data: T;
    itemKey: string;
    onClick: () => void;
    columnExpanded: boolean;
    isSelected: boolean;
    rowStart: number;
    columnStart: number;
    parentRef: MutableRefObject<HTMLDivElement | null>;
    depth?: number;
    width?: number;
};

export type CustomGroupView<T extends Record<PropertyKey, unknown>> = {
    data: DataSet<T>;
    onClick: () => void;
    onSelect?: (item: T) => void;
    onGroupeSelect?: (item: any) => void;
    columnExpanded: boolean;
    groupByKeys: (keyof T)[];
};

export type CustomHeaderView<T extends Record<PropertyKey, unknown>> = {
    garden: GardenGroups<T>;
    columnIndex: number;
    columnIsExpanded: boolean;
    groupByKey?: string;
};

export type CustomVirtualView<T extends Record<PropertyKey, unknown>> = {
    customItemView?: MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
    customGroupView?: MemoExoticComponent<(args: CustomGroupView<T>) => JSX.Element>;
    customHeaderView?: MemoExoticComponent<(args: CustomHeaderView<T>) => JSX.Element>;
    customGroupByView?: React.FC;
};

export type GardenOptions<T extends Record<PropertyKey, unknown>, D = T> = {
    gardenKey: keyof T;
    itemKey: keyof T;
    objectIdentifier: keyof T;
    groupByKeys?: (keyof T)[];
    customGroupByKeys?: Record<string, unknown>;
    customStateFunction?: (data: T[]) => Record<string, unknown>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    fieldSettings?: FieldSettings<T, string>;
    /** Wrap custom components with memo if type: "virtual". */
    customViews?: CustomVirtualView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    collapseSubGroupsByDefault?: boolean;
    itemWidth?: (
        garden: GardenGroups<T>,
        key: string,
        customGroupByKeys?: Record<string, unknown>
    ) => number;
    rowHeight?: number;
    highlightColumn?: (
        groupBy: string,
        customGroupByKeys?: Record<string, unknown>
    ) => string | undefined;
    intercepters?: GardenDataIntercepters<T>;
    onSelect?: (item: T) => string;
    onGroupeSelect?: (item: D) => string;
    /** Function that returns the string of text that is to be displayed when a column is expanded */
    customDescription?: (item: T) => string;
    /** Function that returns the color of the item to be displayed */
    customItemColor?: (item: T) => string;
};

export type PreGroupByFiltering<T extends Record<PropertyKey, unknown>> = (
    arr: T[],
    groupByKey: string
) => T[];
export type PostGroupBySorting<
    T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
> = (data: GardenGroups<T>, keys: (keyof T)[]) => GardenGroups<T>;

export type GardenDataIntercepters<T extends Record<PropertyKey, unknown>> = {
    preGroupFiltering?: PreGroupByFiltering<T>;
    postGroupSorting?: PostGroupBySorting<T>;
};
