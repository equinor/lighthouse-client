import { createContext, useState, useContext, useCallback, useEffect } from 'react';

import { GardenApi } from '../../../../components/ParkView/Models/gardenApi';
import { FilterApi } from '../../../../packages/Filter/Hooks/useFilterApi';
import { TableAPI } from '../../../../packages/Table/Types';
import { WorkspaceEvents } from '../Components/WorkSpace/WorkSpaceView';
import { DataApi } from './DataProvider';
import { LocationApi } from './LocationProvider';

interface MasterApiProviderProps {
    events: WorkspaceEvents;
    children: React.ReactNode;
}

export interface MasterApi {
    garden?: GardenApi;
    table?: TableAPI;
    filter?: FilterApi<unknown>;
    dataApi?: DataApi;
    locationApi?: LocationApi;
}

export interface MasterApiWithSetters extends MasterApi {
    setters: MasterApiSetters;
}
interface MasterApiSetters {
    setGardenApi: (api: GardenApi) => void;
    setTableApi: (api: TableAPI) => void;
    setFilterApi: (api: FilterApi<unknown>) => void;
    setDataApi: (api: DataApi) => void;
    setLocationApi: (api: LocationApi) => void;
}

const MasterApiContext = createContext<MasterApiWithSetters>({} as MasterApiWithSetters);

/**
 * Root datastore for all Workspace apis
 * @returns
 */
export const MasterApiProvider = ({ children, events }: MasterApiProviderProps): JSX.Element => {
    const updateMasterApi = useCallback(
        (newState: Partial<MasterApiWithSetters>): void =>
            setMasterApi((s) => ({ ...s, ...newState })),
        []
    );

    const setGardenApi = useCallback(
        (api: GardenApi) => {
            events.onGardenTabReady && events.onGardenTabReady(api);
            updateMasterApi({ garden: api });
        },
        [events, updateMasterApi]
    );
    const setTableApi = useCallback(
        (api: TableAPI) => {
            events.onTableTabReady && events.onTableTabReady(api);
            updateMasterApi({ table: api });
        },
        [events, updateMasterApi]
    );
    const setFilterApi = useCallback(
        (api: FilterApi<unknown>) => {
            events.onFilterReady && events.onFilterReady(api);
            updateMasterApi({ filter: api });
        },
        [events, updateMasterApi]
    );

    const setDataApi = useCallback(
        (api: DataApi) => {
            events.onDataApiReady && events.onDataApiReady(api);
            updateMasterApi({ dataApi: api });
        },
        [events, updateMasterApi]
    );

    const setLocationApi = useCallback(
        (api) => {
            //TODO: Event?
            updateMasterApi({ locationApi: api });
        },
        [updateMasterApi]
    );

    const [masterApi, setMasterApi] = useState<MasterApiWithSetters>({
        setters: { setFilterApi, setGardenApi, setTableApi, setDataApi, setLocationApi },
    });
    useEffect(() => {
        if (isMasterApiReady(masterApi)) {
            //Dont expose setters
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { setters, ...api } = masterApi;
            events.onMasterApiReady && events.onMasterApiReady(api);
        }
    }, [masterApi]);

    return <MasterApiContext.Provider value={masterApi}>{children}</MasterApiContext.Provider>;
};

type SelectorFunction<T, R> = (s: T) => R;
// Context for tab apis, and filter
export function useMasterApiContext<R = MasterApiWithSetters>(
    selector?: SelectorFunction<MasterApiWithSetters, R>
): R {
    const select = (selector ? selector : (s: MasterApiWithSetters) => s) as (
        s: MasterApiWithSetters
    ) => R;
    return select(useContext(MasterApiContext));
}

/**
 * Check if the right amount of Api's has been initialized
 */
export function isMasterApiReady(api: MasterApi): boolean {
    if (!api.dataApi) return false;

    if (!api.locationApi) return false;

    if (!api.filter) return false;

    return true;
}
