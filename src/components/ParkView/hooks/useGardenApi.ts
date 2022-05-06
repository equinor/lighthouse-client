import { useParkViewContext } from '../Context/ParkViewProvider';
import { GardenApi } from '../Models/gardenApi';

interface GardenApiConstructor {
    createGardenApi: () => GardenApi;
}

export function useGardenApi(): GardenApiConstructor {
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

    function createGardenApi(): GardenApi {
        return {
            mutations: {
                setCustomGroupKeys: setCustomGroupKeys,
                setCustomState: setCustomState,
                setGardenKey: setGardenKey,
                setGroupKeys: setGroupKeys,
            },
            states: {
                getCurrentGroupByKeys: () => groupByKeys as string[],
                getCustomGroupByKeys: () => customGroupByKeys,
                getCustomState: () => customState,
                getGardenKey: () => gardenKey,
            },
        };
    }
    return {
        createGardenApi: createGardenApi,
    };
}
