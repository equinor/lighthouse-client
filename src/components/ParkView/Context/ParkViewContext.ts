import { createContext } from 'react';
import { GardenOptions, Status, TreeOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { DataSet } from '../Models/data';

export interface CustomItemViewProps<T> {
    data: T;
    itemKey: string;
    onClick: () => void;
}

export interface CustomGroupViewProps<T> {
    data: DataSet<T>;
    onClick: () => void;
}

export interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}

export interface StatusView<T> {
    statusItemFunc: (data: T) => Status;
    statusGroupFunc?: (group: DataSet<T>) => Status;
    shouldAggregate: boolean;
}

export interface CustomView<T> {
    CustomItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    CustomGroupView?: React.FC<{ data: DataSet<any>; onClick: () => void }>;
}

export interface ParkViewState {
    gardenKey?: string;
    itemKey: string;
    groupByKeys: string[];
    excludeKeys?: string[];
    customView: CustomView<unknown>;
    options?: Options<unknown>;
    status?: StatusView<unknown>;
    data: unknown[] | undefined;
}

export interface ParkViewContextState extends ParkViewState {
    setGroupKeys: (groupKeys: string[]) => void;
    setExcludeKeys: (excludeKeys: string[]) => void;
    setGardenKey: (groupeKey?: string) => void;
}

export interface ParkViewProviderProps<T> {
    children: React.ReactNode;
    parkViewOptions: GardenOptions<T> | TreeOptions<T>;
    data: T[] | undefined;
}

export enum DataAction {
    setGroupKeys = 'setGroupKeys',
    setGardenKey = 'setGardenKey',
    setExcludeKeys = 'setExcludeKeys',
    setData = 'setData',
}

export const ParkViewContext = createContext({} as ParkViewContextState);
