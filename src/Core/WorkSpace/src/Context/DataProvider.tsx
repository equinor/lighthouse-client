import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useDataViewerKey';
import {
    GardenOptions,
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

    const { dataSource, validator } = options;
    const [isLoading, setIsLoading] = useState(true);
    const initialState: DataState = {
        key,
        data: [],
        subData: {},
        item: {},
        ...options,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        setIsLoading(true);
        dispatch(actions.setOptions(initialState));
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const { refetch } = useQuery(
        key,
        async () => {
            if (!dataSource) return;
            setIsLoading(true);
            const data = await dataSource();
            dispatch(actions.getData(data));
            setIsLoading(false);
            return data;
        },
        { refetchOnWindowFocus: false }
    );

    useEffect(() => {
        refetch();
    }, [dataSource]);

    // const getData = useCallback(async () => {
    //     if (dataSource) {
    //         setIsLoading(true);
    //         await refetch();
    //         if (!data) return;
    //         console.warn('Datasource returned nothing');
    //         if (validator) {
    //             dispatch(actions.getData(validator(data)));
    //             setIsLoading(false);
    //             return;
    //         }
    //         // eslint-disable-next-line no-console
    //         console.warn(`Data may not be valid. Data validator is not registered for ${name}.`);
    //         dispatch(actions.getData(data));
    //         setIsLoading(false);
    //     }
    // }, [dataSource, validator]);

    return (
        <DataContext.Provider
            value={{
                ...state,
                getData: refetch,
                isLoading,
            }}
        >
            {isLoading ? <Loading>Loading...</Loading> : children}
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
