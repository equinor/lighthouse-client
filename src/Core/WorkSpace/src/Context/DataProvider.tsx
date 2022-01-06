import { AnalyticsOptions } from '@equinor/Diagrams';
import { FilterOptions } from '@equinor/filter';
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useDataViewerKey';
import {
    DataViewSideSheetOptions,
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
    dataViewSideSheetOptions?: DataViewSideSheetOptions;
    workflowEditorOptions?: WorkflowEditorOptions;
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
    setOptions = 'setOptions',
}

export const actions = {
    getData: createCustomAction(DataAction.getData, (data: any[]) => ({ data })),
    setOptions: createCustomAction(DataAction.setOptions, (options) => ({ options })),
    setSelected: createCustomAction(DataAction.setSelected, (item: any) => ({ item })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const DataContext = createContext({} as DataContextState);

export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.getData):
            return { ...state, data: action.data };
        case getType(actions.setSelected):
            return { ...state, item: action.item };
        case getType(actions.setOptions):
            return { ...state, ...action.options };
        default:
            return state;
    }
}

export const DataProvider = ({ children }: DataProviderProps): JSX.Element => {
    const key = useWorkSpaceKey();
    const {
        name,
        viewComponent,
        validator,
        viewOptions,
        tableOptions,
        filterOptions,
        dataSource,
        treeOptions,
        gardenOptions,
        analyticsOptions,
        statusFunc,
        powerBiOptions,
        dataViewSideSheetOptions,
        workflowEditorOptions,
    } = useWorkSpace();

    const initialState: DataState = {
        key,
        name,
        data: [],
        subData: {},
        item: {},
        viewComponent,
        viewOptions,
        filterOptions,
        treeOptions,
        tableOptions,
        gardenOptions,
        analyticsOptions,
        statusFunc,
        powerBiOptions,
        dataViewSideSheetOptions,
        workflowEditorOptions,
    };

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    useEffect(() => {
        dispatch(
            actions.setOptions({
                viewComponent,
                viewOptions,
                filterOptions,
                treeOptions,
                tableOptions,
                gardenOptions,
                analyticsOptions,
                statusFunc,
                powerBiOptions,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const getData = useCallback(async () => {
        if (dataSource) {
            const data = await dataSource();
            if (validator) {
                dispatch(actions.getData(validator(data)));
                return;
            }
            // eslint-disable-next-line no-console
            console.warn(`Data may not be valid. Data validator is not registered for ${name}.`);
            dispatch(actions.getData(data));
        }
    }, []);

    const setSelected = (item: any) => {
        dispatch(actions.setSelected(item !== state.item ? item : {}));
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
