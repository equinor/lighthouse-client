import { createContext } from 'react';
import { DataSet } from '../Models/data';
import { GardenOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';

export interface GardenState<T> {
    groupeKey: keyof T;
    itemKey: keyof T;
    groupByKeys?: (keyof T)[];
    excludeKeys?: (keyof T)[];
    customItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    statusFunc?: (data: T) => string;
    customGroupView?: React.FC<{ data: DataSet<any>; onClick: () => void }>;
    groupKeys: string[];
    data: T[] | undefined;
}

export interface GardenContextState<T> extends GardenState<T> {
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

export const GardenContext = createContext({} as GardenContextState<any>);
