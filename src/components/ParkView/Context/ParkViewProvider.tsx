import {
    CustomView,
    ParkViewProviderProps,
    ParkViewState,
    ParkViewContext,
    Options,
    StatusView,
} from './ParkViewContext';
import { actions } from './ParkViewActions';
import { GardenReducer } from './ParkViewReducer';
import { useContext, useEffect, useReducer } from 'react';
import { GardenOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';

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
    };
}
