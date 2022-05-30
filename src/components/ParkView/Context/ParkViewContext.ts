import { createContext } from 'react';
import { TreeOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { DataSet } from '../Models/data';
import { GardenOptions } from '../Models/gardenOptions';

export interface CustomItemViewProps<T> {
    data: T;
    itemKey: string;
    onClick: () => void;
}

export interface CustomGroupViewProps<T> {
    data: DataSet<T>;
    onClick: () => void;
}

export type ParkViewState<T extends unknown> = GardenOptions<T> & {
    data: T[] | undefined;
    onSelect: (item: unknown) => string;
};

export type ParkViewContextState = ParkViewState<unknown> & {
    setGroupKeys: (groupKeys: string[]) => void;
    setCustomGroupKeys: (groupKeys: Record<string, unknown>) => void;
    setGardenKey: (groupeKey?: string) => void;
    setCustomState: (customState: Record<string, unknown>) => void;
    customState?: Record<string, unknown>;
};

export interface ParkViewProviderProps<T> {
    children: React.ReactNode;
    parkViewOptions: GardenOptions<T> | TreeOptions<T>;
    data: T[] | undefined;
}

export enum DataAction {
    setGroupKeys = 'setGroupKeys',
    setCustomGroupKeys = 'setCustomGroupKeys',
    setGardenKey = 'setGardenKey',
    setData = 'setData',
    setCustomState = 'setCustomState',
}

export const ParkViewContext = createContext({} as ParkViewContextState);
