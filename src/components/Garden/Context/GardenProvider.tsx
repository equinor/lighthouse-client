import { useContext, useReducer } from 'react';
import {
    GardenContext,
    GardenContextState,
    GardenProviderProps,
    GardenState,
} from './GardenContext';
import { actions } from './GardenActions';
import { GardenReducer } from './GardenReducer';

export function GardenProvider<T>({
    children,
    data,
    gardenOptions,
}: GardenProviderProps<T>): JSX.Element {
    const initialState: GardenState<any> = {
        groupKeys: gardenOptions.groupByKeys as string[],
        groupeKey: gardenOptions.groupeKey,
        itemKey: gardenOptions.itemKey,
        customGroupView: gardenOptions.customGroupView,
        customItemView: gardenOptions.customItemView,
        excludeKeys: gardenOptions.excludeKeys,
        groupByKeys: gardenOptions.groupByKeys,
        statusFunc: gardenOptions.statusFunc,
        data: data,
    };
    const [state, dispatch] = useReducer(GardenReducer, initialState);

    function setGroupKeys(groupKeys: string[]): void {
        dispatch(actions.setGroupKeys(groupKeys));
    }

    function setGroupeKey(groupeKey: string): void {
        dispatch(actions.setGroupeKey(groupeKey));
    }

    function setExcludeKeys(excludeKeys: string[]): void {
        dispatch(actions.setExcludeKeys(excludeKeys));
    }

    return (
        <GardenContext.Provider
            value={{
                ...state,
                setGroupKeys,
                setGroupeKey,
                setExcludeKeys,
            }}
        >
            {children}
        </GardenContext.Provider>
    );
}

export function useGardenContext(): GardenContextState<any> {
    return useContext(GardenContext);
}
