import { createContext, useContext, useEffect, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { CustomHeader as HeaderData } from '../../Table/types';
import { useLocationKey } from '../Hooks/useLocationKey';
import { generateDefaultHeader } from '../Utils/generateHeaderKeys';
import { storage } from '../Utils/storage';

interface TableState {
    activeHeader: string;
    sortDirection: boolean;
    headers: HeaderData[];
    localHeaderData?: HeaderData[];
    awaitableHeaders: HeaderData[];
}

interface TableContextState extends TableState {
    setHeaderData: (headers: HeaderData[]) => void;
    setSelectedColum: (culmKey: string) => void;
    toggleSortDirection: (sortDirection: boolean) => void;
}

interface TableProviderProps<T> {
    children: React.ReactNode;
    defaultHeaderItem: Object;
    headerOptions?: HeaderData[];
}

export enum DataAction {
    addLocalHeader = 'addLocalHeader',
    setHeaderData = 'setHeaderData',
    setAwaitableHeaders = 'setAwaitableHeaders',
    setActiveHeader = 'setActiveHeader',
    setSortDirection = 'setSortDirection',
}

export const actions = {
    setLocalHeader: createCustomAction(DataAction.addLocalHeader, (headers: HeaderData[]) => ({
        headers,
    })),
    setHeaderData: createCustomAction(DataAction.setHeaderData, (headers: HeaderData[]) => ({
        headers,
    })),
    setAwaitableHeaders: createCustomAction(
        DataAction.setAwaitableHeaders,
        (headers: HeaderData[]) => ({ headers })
    ),
    setActiveHeader: createCustomAction(DataAction.setActiveHeader, (activeHeader: string) => ({
        activeHeader,
    })),
    setSortDirection: createCustomAction(DataAction.setSortDirection, (sortDirection: boolean) => ({
        sortDirection,
    })),
};

export type OfflineDocumentsActionType = typeof DataAction;

export type Action = ActionType<typeof actions>;

const TableContext = createContext({} as TableContextState);

export function tableReducer(state: TableState, action: Action): TableState {
    switch (action.type) {
        case getType(actions.setLocalHeader):
            return { ...state, localHeaderData: action.headers };
        case getType(actions.setAwaitableHeaders):
            return { ...state, awaitableHeaders: action.headers };
        case getType(actions.setHeaderData):
            return { ...state, headers: action.headers };
        case getType(actions.setActiveHeader):
            return { ...state, activeHeader: action.activeHeader };
        case getType(actions.setSortDirection):
            return { ...state, sortDirection: action.sortDirection };

        default:
            return state;
    }
}
const initialSate: TableState = {
    activeHeader: '',
    sortDirection: false,
    headers: [],
    localHeaderData: undefined,
    awaitableHeaders: [],
};

export function TableProvider<T>({
    children,
    headerOptions,
    defaultHeaderItem,
}: TableProviderProps<T>) {
    const locationKey = useLocationKey();
    const headerLocationKey = `table-header-${locationKey}`;

    const [state, dispatch] = useReducer(tableReducer, initialSate);

    useEffect(() => {
        const newHeaderData = headerOptions
            ? headerOptions
            : generateDefaultHeader(defaultHeaderItem);
        dispatch(actions.setAwaitableHeaders(newHeaderData));
    }, [headerOptions, defaultHeaderItem]);

    useEffect(() => {
        if (state.headers.length > 0) return;
        const localHeaders = storage.getItem<HeaderData[]>(headerLocationKey);

        if (
            localHeaders &&
            Array.isArray(localHeaders) &&
            localHeaders.length > 0 &&
            typeof localHeaders !== 'string'
        ) {
            dispatch(actions.setLocalHeader(localHeaders));
            dispatch(actions.setHeaderData(localHeaders));
        } else if (state.awaitableHeaders.length > 0) {
            dispatch(actions.setHeaderData(state.awaitableHeaders));
            storage.setItem<HeaderData[]>(headerLocationKey, state.awaitableHeaders);
        }
    }, [state]);

    function setHeaderData(headers: HeaderData[]): void {
        dispatch(actions.setHeaderData(headers));
        storage.setItem<HeaderData[]>(headerLocationKey, headers);
    }

    function setSelectedColum(culmKey: string): void {
        dispatch(actions.setActiveHeader(culmKey));
    }

    function toggleSortDirection(sortDirection: boolean): void {
        dispatch(actions.setSortDirection(sortDirection));
    }

    return (
        <TableContext.Provider
            value={{
                ...state,
                setHeaderData,
                toggleSortDirection,
                setSelectedColum,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}

export function useTableContext() {
    return useContext(TableContext);
}
