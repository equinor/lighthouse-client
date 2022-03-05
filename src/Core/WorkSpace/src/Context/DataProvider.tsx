import { AnalyticsOptions } from '@equinor/Diagrams';
import { CircularProgress, Icon } from '@equinor/eds-core-react';
import { FilterOptions } from '@equinor/filter';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import styled from 'styled-components';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useDataViewerKey';
import {
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions,
    WorkflowEditorOptions,
} from '../WorkSpaceApi/workspaceState';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
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

type DataApi = DataOperations & UseQueryResult<unknown[] | undefined, unknown>;

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
    const options = useWorkSpace();

    const { dataSource } = options;

    const initialState: DataState = {
        key,
        subData: {},
        item: {},
        ...options,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        dispatch(actions.setOptions(initialState));
        dataApi.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const dataApi = useQuery(
        key,
        async () => {
            if (!dataSource) return;
            return await dataSource();
        },
        { refetchOnWindowFocus: false, staleTime: 1 * 1000 * 60 * 60 }
    );

    useEffect(() => {
        dataApi.refetch();
    }, [dataSource]);

    const queryClient = useQueryClient();

    function patchRecord(id: string, item: unknown, identifier?: string) {
        const query = queryClient.getQueryCache().find(key);
        if (!query || !dataApi.data) return;

        const patchIndex = dataApi.data.findIndex(
            (record: any) => record[identifier ?? options.objectIdentifier] === id
        );
        if (patchIndex === -1) return;

        query.setData((dataApi.data[patchIndex] = item));
    }

    function deleteRecord(id: string, identifier?: string) {
        const query = queryClient.getQueryCache().find(key);
        if (!query || !dataApi.data) return;

        query.setData(
            dataApi.data.filter(
                (record: any) => record[identifier ?? options.objectIdentifier] !== id
            )
        );
    }

    function getRecord(id: string, identifier?: string) {
        if (!dataApi.data) return;

        return dataApi.data.find(
            (record: any) => record[identifier ?? options.objectIdentifier] === id
        );
    }

    function insertRecord(item: unknown) {
        const query = queryClient.getQueryCache().find(key);
        if (!query || !dataApi.data) return;

        query.setData([item, ...dataApi.data]);
    }

    return (
        <DataContext.Provider
            value={{
                ...state,
                data: dataApi.data || [],
                dataApi: {
                    ...dataApi,
                    insertRecord,
                    getRecord,
                    deleteRecord,
                    patchRecord,
                },
            }}
        >
            {dataApi.isLoading ? (
                <Loading>
                    <CircularProgress value={0} size={48} />
                </Loading>
            ) : dataApi.error ? (
                <Loading>
                    <Icon name="error_outlined" />
                    Something went wrong
                </Loading>
            ) : (
                children
            )}
        </DataContext.Provider>
    );
};

export function useDataContext(): DataContextState {
    return useContext(DataContext);
}

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
