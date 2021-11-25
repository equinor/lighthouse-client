import { createContext } from 'react';
import { DataSet } from '../Models/data';
import { GardenOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';

export interface CustomItemViewProps<T> {
    data: T;
    itemKey: string;
    onClick: () => void;
}

export interface CustomGroupViewProps<T> {
    data: DataSet<T>;
    onClick: () => void;
}

export type StatusFunc<T> = (data: T) => string;

export interface GardenState {
    groupeKey: string;
    itemKey: string;
    groupByKeys: string[];
    excludeKeys?: string[];
    customItemView?: React.FC<CustomItemViewProps<unknown>>;
    statusFunc?: StatusFunc<unknown>;
    customGroupView?: React.FC<CustomGroupViewProps<unknown>>;
    data: unknown[] | undefined;
}

export interface GardenContextState extends GardenState {
    setGroupKeys: (groupKeys: string[]) => void;
    setExcludeKeys: (excludeKeys: string[]) => void;
    setGroupeKey: (groupeKey: string) => void;
}

export interface GardenProviderProps<T> {
    children: React.ReactNode;
    gardenOptions: GardenOptions<T>;
    data: T[] | undefined;
}

export enum DataAction {
    setGroupKeys = 'setGroupKeys',
    setGroupeKey = 'setGroupeKey',
    setExcludeKeys = 'setExcludeKeys',
}

export const GardenContext = createContext({} as GardenContextState);
