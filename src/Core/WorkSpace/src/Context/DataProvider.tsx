import { useAtom } from '@dbeining/react-atom';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { FilterOptions } from '../../../../packages/Filter/Types';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useWorkspaceKey';
import { checkResponseCode } from '../Functions/checkResponseCode';
import * as queryCacheOperations from '../Functions/DataOperations';
import { QueryCacheArgs } from '../Functions/DataOperations/queryCacheArgs';
import { usePrefetchQueries } from '../Hooks/usePrefetchQueries';
import {
    getWorkSpaceContext,
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions
} from '../WorkSpaceApi/workspaceState';
import { DataViewerProps, ViewOptions } from '../WorkSpaceApi/WorkSpaceTypes';

interface DataState {
    key: string;
    name: string;
    subData: Record<string, any[]>;
    item: Record<string, unknown>;
    viewComponent?: React.FC<DataViewerProps<unknown>>;
    viewOptions?: ViewOptions<unknown>;
    filterOptions?: FilterOptions<unknown>;
    tableOptions?: TableOptions<unknown>;
    treeOptions?: TreeOptions<unknown>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<unknown>;
    analyticsOptions?: AnalyticsOptions<unknown>;
    statusFunc?: StatusFunc<unknown>;
    powerBiOptions?: PowerBiOptions;
    workflowEditorOptions?: WorkflowEditorOptions;
}
interface DataContextState extends DataState {
    data: any[];
    dataApi: DataApi;
}

type DataApi = DataOperations & UseQueryResult<unknown[] | undefined, unknown> & QueryInformation;

interface QueryInformation {
    queryKey: string;
}

interface DataOperations {
    patchRecord: (id: string, item: unknown, identifier?: string) => void;
    deleteRecord: (id: string, identifier?: string) => void;
    getRecord: (id: string, identifier?: string) => void;
    insertRecord: (item: unknown) => void;
}

interface DataProviderProps {
    children: React.ReactNode;
}

export enum DataAction {
    setOptions = 'setOptions',
}

const ONE_HOUR = 1000 * 60 * 60;

const resetConfig = {
    viewComponent: undefined,
    viewOptions: undefined,
    filterOptions: undefined,
    tableOptions: undefined,
    treeOptions: undefined,
    timelineOptions: undefined,
    gardenOptions: undefined,
    analyticsOptions: undefined,
    statusFunc: undefined,
    powerBiOptions: undefined,
    workflowEditorOptions: undefined,
};

export const actions = {
    setOptions: createCustomAction(DataAction.setOptions, (options) => ({ options })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const DataContext = createContext({} as DataContextState);

export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.setOptions):
            return { ...state, ...action.options };
        default:
            return state;
    }
}

export const DataProvider = ({ children }: DataProviderProps): JSX.Element => {
    const key = useWorkSpaceKey();
    const currentWorkspace = useAtom(getWorkSpaceContext());

    const { dataSource, objectIdentifier, prefetchQueriesOptions } = currentWorkspace[key];

    const queryClient = useQueryClient();

    usePrefetchQueries(prefetchQueriesOptions ?? []);

    const initialState: DataState = {
        key,
        subData: {},
        item: {},
        ...resetConfig,
        ...currentWorkspace[key],
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        dispatch(actions.setOptions(initialState));
        queryApi.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const queryApi = useQuery(
        [key],
        async ({ signal }) => {
            if (!dataSource) return;

            let response: Response | null;
            try {
                response = await dataSource.responseAsync(signal);
            } catch (e) {
                throw 'Server failed to respond';
            }

            checkResponseCode(response);

            const data: unknown[] = dataSource.responseParser
                ? await dataSource.responseParser(response)
                : await response.json();

            if (Array.isArray(data)) {
                return data;
            }
            throw 'Unknown data format';
        },
        { refetchOnWindowFocus: false, staleTime: ONE_HOUR }
    );

    useEffect(() => {
        queryApi.refetch();
    }, [dataSource]);

    const workspaceInternalApi: QueryCacheArgs<unknown> = {
        key,
        objectIdentifier,
        queryApi,
        queryClient,
    };

    /** Patches a record in the queryCache */
    const patchRecord = (id: string, item: unknown, identifier?: string) =>
        queryCacheOperations.patchRecord({ id, item, identifier }, workspaceInternalApi);

    /** Patches a record in the queryCache */
    const deleteRecord = (id: string, identifier?: string) =>
        queryCacheOperations.deleteRecord({ id, identifier }, workspaceInternalApi);

    const getRecord = (id: string, identifier?: string) =>
        queryCacheOperations.getRecord({ id, identifier }, workspaceInternalApi);

    const insertRecord = (item: unknown) =>
        queryCacheOperations.insertRecord({ item }, workspaceInternalApi);

    return (
        <DataContext.Provider
            value={{
                ...state,
                data: queryApi.data || [],
                dataApi: {
                    ...queryApi,
                    queryKey: key,
                    insertRecord,
                    getRecord,
                    deleteRecord,
                    patchRecord,
                },
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export function useDataContext(): DataContextState {
    return useContext(DataContext);
}
