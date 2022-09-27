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
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
import {
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
} from '../WorkSpaceApi/workspaceState';
import { DataViewerProps, ViewOptions } from '../WorkSpaceApi/WorkSpaceTypes';

type DataState = {
    key: string;
    name: string;
    subData: Record<string, unknown[]>;
    item: Record<string, unknown>;
    viewComponent?: React.FC<DataViewerProps<Record<PropertyKey, unknown>>>;
    viewOptions?: ViewOptions<Record<PropertyKey, unknown>>;
    filterOptions?: FilterOptions<Record<PropertyKey, unknown>>;
    tableOptions?: TableOptions<Record<PropertyKey, unknown>>;
    treeOptions?: TreeOptions<Record<PropertyKey, unknown>>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<Record<PropertyKey, unknown>>;
    analyticsOptions?: AnalyticsOptions<Record<PropertyKey, unknown>>;
    statusFunc?: StatusFunc<Record<PropertyKey, unknown>>;
    powerBiOptions?: PowerBiOptions;
    workflowEditorOptions?: WorkflowEditorOptions;
};
type DataContextState = DataState & {
    data: Record<PropertyKey, unknown>[];
    dataApi: DataApi;
};

type DataApi = DataOperations & UseQueryResult<unknown[] | undefined, unknown> & QueryInformation;

type QueryInformation = {
    queryKey: string;
};

type DataOperations = {
    patchRecord: (id: string, item: unknown, identifier?: string) => void;
    deleteRecord: (id: string, identifier?: string) => void;
    getRecord: (id: string, identifier?: string) => void;
    insertRecord: (item: unknown) => void;
};

type DataProviderProps = {
    children: React.ReactNode;
};

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
    const currentWorkspace = useWorkSpace();

    const { dataSource, objectIdentifier, prefetchQueriesOptions } = currentWorkspace;

    const queryClient = useQueryClient();

    usePrefetchQueries(prefetchQueriesOptions ?? []);

    const initialState: DataState = {
        key,
        subData: {},
        item: {},
        ...currentWorkspace,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

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

        return () => {
            dispatch(actions.setOptions({ ...resetConfig, ...initialState }));
            queryApi.remove();
        };
    }, [key]);

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
