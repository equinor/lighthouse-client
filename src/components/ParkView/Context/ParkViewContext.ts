import { createContext } from 'react';
import { TreeOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { DataSet } from '../Models/data';
import { GardenOptions } from '../Models/gardenOptions';

export type CustomItemViewProps<T> = {
    data: T;
    itemKey: string;
    onClick: () => void;
};

export type CustomGroupViewProps<T extends Record<PropertyKey, unknown>> = {
    data: DataSet<T>;
    onClick: () => void;
};

export type ParkViewState<T extends Record<PropertyKey, unknown>> = GardenOptions<T> & {
    data: T[] | undefined;
    onSelect: (item: unknown) => string;
    onGroupeSelect: (item: unknown) => string;
};

export type ParkViewContextState = ParkViewState<Record<PropertyKey, unknown>> & {
    setGroupKeys: (groupKeys: string[]) => void;
    setCustomGroupKeys: (groupKeys: Record<string, unknown>) => void;
    setGardenKey: (groupeKey?: PropertyKey) => void;
    setCustomState: (customState: Record<string, unknown>) => void;
    customState?: Record<string, unknown>;
};

export type ParkViewProviderProps<T extends Record<PropertyKey, unknown>> = {
    children: React.ReactNode;
    parkViewOptions: GardenOptions<T> | TreeOptions<T>;
    data: T[];
};

export enum DataAction {
    setGroupKeys = 'setGroupKeys',
    setCustomGroupKeys = 'setCustomGroupKeys',
    setGardenKey = 'setGardenKey',
    setData = 'setData',
    setCustomState = 'setCustomState',
}

export const ParkViewContext = createContext({} as ParkViewContextState);
