import { useContext, useEffect, useReducer } from 'react';
import { FieldSettings } from '../Models/fieldSettings';
import { CustomView, GardenOptions, Options, StatusView } from '../Models/gardenOptions';

import { actions } from './ParkViewActions';
import { ParkViewContext, ParkViewProviderProps, ParkViewState } from './ParkViewContext';
import { GardenReducer } from './ParkViewReducer';

export function ParkViewProvider<T>({
    children,
    data,
    parkViewOptions,
}: ParkViewProviderProps<T>): JSX.Element {
    const initialState: ParkViewState<T> = {
        ...parkViewOptions,
        data: data,
        groupByKeys: parkViewOptions?.groupByKeys || [],
        onSelect: parkViewOptions.onSelect as (item: unknown) => void,
        gardenKey: (parkViewOptions as GardenOptions<T>)?.gardenKey,
    };
    const [state, dispatch] = useReducer(GardenReducer, initialState);

    function setGroupKeys(groupKeys: string[]): void {
        const keys = groupKeys;
        dispatch(actions.setGroupKeys(keys));
    }

    function setGardenKey(gardenKey?: string): void {
        dispatch(actions.setGardenKey(gardenKey));
    }

    function setCustomGroupKeys(groupKeys: Record<string, unknown>): void {
        dispatch(actions.setCustomGroupKeys(groupKeys));
    }

    useEffect(() => {
        if (!(data && data?.length > 0)) return;

        dispatch(actions.setData(data as unknown[]));

        const customState = (parkViewOptions as GardenOptions<T>)?.customStateFunction?.(data);

        customState && dispatch(actions.setCustomState(customState));
    }, [data, parkViewOptions]);

    return (
        <ParkViewContext.Provider
            value={{
                ...state,
                setGroupKeys,
                setGardenKey,
                setCustomGroupKeys,
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
        groupByKeys: parkViewContext.groupByKeys as (keyof T)[],
        customView: parkViewContext.customViews as CustomView<T>,
        customGroupByKeys: parkViewContext.customGroupByKeys || {},
        customState: parkViewContext.customState || {},
        status: parkViewContext.status as StatusView<T>,
        options: parkViewContext.options as Options<T>,
        data: parkViewContext.data as T[],
        fieldSettings: parkViewContext.fieldSettings as FieldSettings<T, string>,
    };
}
