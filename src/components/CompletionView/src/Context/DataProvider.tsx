import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { createContext, useCallback, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { useDataViewerKey } from '../Components/DefaultDataView/Hooks/useDataViewerKey';
import { DataViewerProps, ViewOptions } from '../DataViewerApi/DataViewerTypes';
import {
    GardenOptions,
    PowerBiOptions,
    StatusFunc,
    TableOptions,
    TreeOptions
} from '../DataViewerApi/DataViewState';
import { useDataViewer } from '../DataViewerApi/useDataViewer';

interface DataState {
    key: string;
    name: string;
    data: any[];
    subData: Record<string, any[]>;
    itemId: string;
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
}
interface DataContextState extends DataState {
    getData: VoidFunction;
    setSelected: (itemId: string) => void;
}
interface DataProviderProps {
    children: React.ReactNode;
}

type VoidFunction = () => void;

export enum DataAction {
    getData = 'getData',
    setSelected = 'setSelected',
}

export const actions = {
    getData: createCustomAction(DataAction.getData, (data: any[]) => ({ data })),
    setSelectedItem: createCustomAction(DataAction.setSelected, (itemId: string) => ({ itemId })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const DataContext = createContext({} as DataContextState);

export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.getData):
            return { ...state, data: action.data };
        case getType(actions.setSelectedItem):
            return { ...state, itemId: action.itemId };
        default:
            return state;
    }
}

export const DataProvider = ({ children }: DataProviderProps): JSX.Element => {
    const key = useDataViewerKey();
    const {
        name,
        viewComponent,
        validator,
        viewOptions,
        tableOptions,
        filterOptions,
        dataFetcher,
        treeOptions,
        gardenOptions,
        analyticsOptions,
        statusFunc,
        powerBiOptions,
    } = useDataViewer();
    const initialState: DataState = {
        key,
        name,
        data: [],
        subData: {},
        itemId: '',
        viewComponent,
        viewOptions,
        filterOptions,
        treeOptions,
        tableOptions,
        gardenOptions,
        analyticsOptions,
        statusFunc,
        powerBiOptions,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const getData = useCallback(async () => {
        if (dataFetcher) {
            const data = await dataFetcher();
            if (validator) {
                dispatch(actions.getData(validator(data)));
                return;
            }
            // eslint-disable-next-line no-console
            console.warn(`Data may not be valid. Data validator is not registered for ${name}.`);
            dispatch(actions.getData(data));
        }
    }, [dataFetcher, name, validator]);

    const setSelected = (itemId: string) => {
        dispatch(actions.setSelectedItem(itemId !== state.itemId ? itemId : ''));
    };

    return (
        <DataContext.Provider
            value={{
                ...state,
                getData,
                setSelected,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export function useDataContext(): DataContextState {
    return useContext(DataContext);
}
