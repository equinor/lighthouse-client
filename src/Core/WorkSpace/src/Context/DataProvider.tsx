import { AnalyticsOptions } from '@equinor/Diagrams';
import { Icon } from '@equinor/eds-core-react';
import { FilterOptions } from '@equinor/filter';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
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
} from '../WorkSpaceApi/State';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
import { DataViewerProps, ViewOptions } from '../WorkSpaceApi/WorkSpaceTypes';

interface DataState {
    key: string;
    name: string;
    data: any[];
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
    getData: VoidFunction;
    isLoading: boolean;
    error: unknown;
}
interface DataProviderProps {
    children: React.ReactNode;
}

type VoidFunction = () => void;

export enum DataAction {
    getData = 'getData',
    setOptions = 'setOptions',
}

export const actions = {
    getData: createCustomAction(DataAction.getData, (data: any[]) => ({ data })),
    setOptions: createCustomAction(DataAction.setOptions, (options) => ({ options })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const DataContext = createContext({} as DataContextState);

export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.getData):
            return { ...state, data: action.data };
        case getType(actions.setOptions):
            return { ...state, ...action.options, data: [] };
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
        data: [],
        subData: {},
        item: {},
        ...options,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        dispatch(actions.setOptions(initialState));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const { refetch, data, isLoading, error } = useQuery(
        key,
        async () => {
            if (!dataSource) return;
            const data = await dataSource();
            dispatch(actions.getData(data));
            return data;
        },
        { refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (!data) return;
        dispatch(actions.getData(data));
    }, [data]);

    useEffect(() => {
        refetch();
    }, [dataSource]);

    return (
        <DataContext.Provider
            value={{
                ...state,
                getData: refetch,
                isLoading,
                error,
            }}
        >
            {isLoading ? (
                <Loading>Loading...</Loading>
            ) : error ? (
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
