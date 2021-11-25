import { useContext, useReducer } from 'react';
import {
    CustomGroupViewProps,
    CustomItemViewProps,
    GardenContext,
    GardenProviderProps,
    GardenState,
    StatusFunc,
} from './GardenContext';
import { actions } from './GardenActions';
import { GardenReducer } from './GardenReducer';

export function GardenProvider<T>({
    children,
    data,
    gardenOptions,
}: GardenProviderProps<T>): JSX.Element {
    const initialState: GardenState = {
        groupeKey: gardenOptions.groupeKey.toString(),
        itemKey: gardenOptions.itemKey.toString(),
        customGroupView: gardenOptions.customGroupView as React.FC<CustomGroupViewProps<unknown>>,
        customItemView: gardenOptions.customItemView as React.FC<CustomItemViewProps<unknown>>,
        excludeKeys: gardenOptions.excludeKeys as string[],
        groupByKeys: (gardenOptions.groupByKeys as string[]) || [],
        statusFunc: gardenOptions.statusFunc as StatusFunc<unknown>,
        data: data,
    };
    const [state, dispatch] = useReducer(GardenReducer, initialState);

    function setGroupKeys(groupKeys: string[]): void {
        const keys = groupKeys;
        dispatch(actions.setGroupKeys(keys));
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

export function useGardenContext<T>() {
    const gardenContext = useContext(GardenContext);

    return {
        ...gardenContext,
        groupeKey: gardenContext.groupeKey as keyof T,
        itemKey: gardenContext.itemKey as keyof T,
        customGroupView: gardenContext.customGroupView as React.FC<CustomGroupViewProps<T>>,
        customItemView: gardenContext.customItemView as React.FC<CustomItemViewProps<T>>,
        excludeKeys: gardenContext.excludeKeys as (keyof T)[],
        groupByKeys: gardenContext.groupByKeys as (keyof T)[],
        statusFunc: gardenContext.statusFunc as StatusFunc<T>,
        data: gardenContext.data as T[],
    };
}

type Hex = `#${string}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a: Hex = '#1233';
