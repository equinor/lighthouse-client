import { createContext, useState, useContext, useCallback } from 'react';

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

interface MasterApi {
    garden?: GardenApi;
    table?: TableAPI;
    filter?: FilterApi<unknown>;
    dataApi?: DataApi;
    setters: MasterApiSetters;
}

interface MasterApiSetters {
    setGardenApi: (api: GardenApi) => void;
    setTableApi: (api: TableAPI) => void;
    setFilterApi: (api: FilterApi<unknown>) => void;
    setDataApi: (api: DataApi) => void;
    setLocationApi: (api: LocationApi) => void;
}

const MasterApiContext = createContext<MasterApi>({} as MasterApi);

/**
 * Root datastore for all Workspace apis
 * @returns
 */
export const MasterApiProvider = ({ children, events }: MasterApiProviderProps): JSX.Element => {
    const updateTabApi = useCallback(
        (newState: Partial<MasterApi>) => setMasterApi((s) => ({ ...s, ...newState })),
        []
    );

    const setGardenApi = useCallback(
        (api: GardenApi) => {
            events.onGardenTabReady && events.onGardenTabReady(api);
            updateTabApi({ garden: api });
        },
        [events, updateTabApi]
    );
    const setTableApi = useCallback(
        (api: TableAPI) => {
            events.onTableTabReady && events.onTableTabReady(api);
            updateTabApi({ table: api });
        },
        [events, updateTabApi]
    );
    const setFilterApi = useCallback(
        (api: FilterApi<unknown>) => {
            events.onFilterReady && events.onFilterReady(api);
            updateTabApi({ filter: api });
        },
        [events, updateTabApi]
    );

    const setDataApi = useCallback(
        (api: DataApi) => {
            events.onDataApiReady && events.onDataApiReady(api);
            updateTabApi({ dataApi: api });
        },
        [events, updateTabApi]
    );

    const setLocationApi = useCallback(
        (api) => {
            //TODO: Event?
            updateTabApi({ location: api });
        },
        [updateTabApi]
    );

    const [masterApi, setMasterApi] = useState<MasterApi>({
        setters: { setFilterApi, setGardenApi, setTableApi, setDataApi, setLocationApi },
    });

    return <MasterApiContext.Provider value={masterApi}>{children}</MasterApiContext.Provider>;
};

type SelectorFunction<T, R> = (s: T) => R;
// Context for tab apis, and filter
export function useMasterApiContext<R = MasterApi>(selector?: SelectorFunction<MasterApi, R>): R {
    const select = (selector ? selector : (s: MasterApi) => s) as (s: MasterApi) => R;
    return select(useContext(MasterApiContext));
}
