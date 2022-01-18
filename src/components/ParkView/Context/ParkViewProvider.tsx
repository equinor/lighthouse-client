import { useContext, useEffect, useReducer } from 'react';
import { FieldSettings } from '../../../apps/swcr/models/FieldSettings';
import { GardenOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { actions } from './ParkViewActions';
import {
    CustomView,
    Options,
    ParkViewContext,
    ParkViewProviderProps,
    ParkViewState,
    StatusView,
} from './ParkViewContext';
import { GardenReducer } from './ParkViewReducer';

export function ParkViewProvider<T>({
    children,
    data,
    parkViewOptions,
}: ParkViewProviderProps<T>): JSX.Element {
    const initialState: ParkViewState = {
        itemKey: parkViewOptions.itemKey.toString(),
        excludeKeys: parkViewOptions.excludeKeys as string[],
        groupByKeys: (parkViewOptions.groupByKeys as string[]) || [],
        customView: parkViewOptions.customViews as CustomView<unknown>,
        options: parkViewOptions.options as Options<unknown>,
        status: parkViewOptions.status as StatusView<unknown>,
        fieldSettings: (parkViewOptions as GardenOptions<unknown>)?.fieldSettings || {},
        data: data,
        gardenKey: (parkViewOptions as GardenOptions<T>)?.gardenKey?.toString(),
    };
    const [state, dispatch] = useReducer(GardenReducer, initialState);

    function setGroupKeys(groupKeys: string[]): void {
        const keys = groupKeys;
        dispatch(actions.setGroupKeys(keys));
    }

    function setGardenKey(gardenKey?: string): void {
        dispatch(actions.setGardenKey(gardenKey));
    }

    function setExcludeKeys(excludeKeys: string[]): void {
        dispatch(actions.setExcludeKeys(excludeKeys));
    }

    useEffect(() => {
        if (data && data.length > 0) {
            dispatch(actions.setData(data as unknown[]));
        }
    }, [data]);

    return (
        <ParkViewContext.Provider
            value={{
                ...state,
                setGroupKeys,
                setGardenKey,
                setExcludeKeys,
            }}
        >
            {children}
        </ParkViewContext.Provider>
    );
}

export function useParkViewContext<T>() {
    const parkViewContext = useContext(ParkViewContext);

    return {
        ...parkViewContext,
        gardenKey: parkViewContext.gardenKey as keyof T,
        itemKey: parkViewContext.itemKey as keyof T,
        excludeKeys: parkViewContext.excludeKeys as (keyof T)[],
        groupByKeys: parkViewContext.groupByKeys as (keyof T)[],
        customView: parkViewContext.customView as CustomView<T>,
        status: parkViewContext.status as StatusView<T>,
        options: parkViewContext.options as Options<T>,
        data: parkViewContext.data as T[],
        fieldSettings: parkViewContext.fieldSettings as FieldSettings<T, string>,
    };
}
