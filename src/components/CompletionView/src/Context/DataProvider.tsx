import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { useDataViewerKey } from '../Components/DefaultDataView/Hooks/useDataViewerKey';
import { DataViewerProps, ViewOptions } from '../DataViewerApi/DataViewerTypes';
import {
    DataViewSideSheetOptions,
    FilterOptions,
    GardenOptions,
    PowerBiOptions,
    TableOptions,
    TreeOptions,
} from '../DataViewerApi/DataViewState';
import { useDataViewer } from '../DataViewerApi/useDataViewer';
interface DataState {
    key: string;
    name: string;
    data: any[];
    item: any;
    viewComponent?: React.FC<DataViewerProps<unknown>>;
    viewOptions?: ViewOptions<unknown>;
    filterOptions?: FilterOptions<unknown>;
    tableOptions?: TableOptions;
    treeOptions?: TreeOptions<unknown>;
    timelineOptions?: any;
    gardenOptions?: GardenOptions<unknown>;
    analyticsOptions?: any;
    powerBiOptions?: PowerBiOptions;
    dataViewSideSheetOptions?: DataViewSideSheetOptions<unknown>;
}
interface DataContextState extends DataState {
    getData: VoidFunction;
    setSelected: (item: any) => void;
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
    setSelectedItem: createCustomAction(DataAction.setSelected, (item: any) => ({ item })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const DataContext = createContext({} as DataContextState);

export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.getData):
            return { ...state, data: action.data };
        case getType(actions.setSelectedItem):
            return { ...state, item: action.item };
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
        powerBiOptions,
        dataViewSideSheetOptions,
    } = useDataViewer();
    const initialState: DataState = {
        key,
        name,
        data: [],
        item: {},
        viewComponent,
        viewOptions,
        filterOptions,
        treeOptions,
        tableOptions,
        gardenOptions,
        powerBiOptions,
        dataViewSideSheetOptions,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const getData = async () => {
        if (dataFetcher) {
            const data = await dataFetcher();
            if (validator) {
                dispatch(actions.getData(validator(data)));
                return;
            }
            console.warn(`Data may not be valid. Data validator is not registered for ${name}.`);
            dispatch(actions.getData(data));
        }
    };

    const setSelected = (item: any) => {
        dispatch(actions.setSelectedItem(item));
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

export function useDataContext() {
    return useContext(DataContext);
}
