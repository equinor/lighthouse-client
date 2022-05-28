import { useCallback } from 'react';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { GardenApi } from '../Models/gardenApi';

export type SelectedRowCallback = (rows: unknown[]) => string | null;

interface GardenApiConstructor {
    createGardenApi: () => GardenApi;
}

export function useGardenApi(
    selectedItem: string | null,
    setSelectedItem: (callBack: SelectedRowCallback | string) => void
): GardenApiConstructor {
    const {
        groupByKeys,
        customGroupByKeys,
        setGroupKeys,
        setCustomGroupKeys,
        setGardenKey,
        setCustomState,
        customState,
        gardenKey,
    } = useParkViewContext();

    const createGardenApi = useCallback((): GardenApi => {
        return {
            mutations: {
                setCustomGroupKeys: setCustomGroupKeys,
                setCustomState: setCustomState,
                setGardenKey: setGardenKey,
                setGroupKeys: setGroupKeys,
                setSelectedItem: setSelectedItem,
            },
            states: {
                getSelectedItem: () => selectedItem,
                getCurrentGroupByKeys: () => groupByKeys as string[],
                getCustomGroupByKeys: () => customGroupByKeys,
                getCustomState: () => customState,
                getGardenKey: () => gardenKey,
            },
        };
    }, [
        customGroupByKeys,
        customState,
        gardenKey,
        groupByKeys,
        selectedItem,
        setCustomGroupKeys,
        setCustomState,
        setGardenKey,
        setGroupKeys,
        setSelectedItem,
    ]);
    return {
        createGardenApi,
    };
}
