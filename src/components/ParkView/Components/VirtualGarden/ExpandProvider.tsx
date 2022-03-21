import { createContext, PropsWithChildren, useEffect, useReducer, useState } from 'react';
import { Data, DataSet } from '../../Models/data';
import { getDescriptionWidth } from './utils';
type Expanded = {
    isExpanded: boolean;
    index: number;
};
type ExpandedItems = Record<string, Expanded>;
type State = {
    expandedColumns: ExpandedItems;
    expandedRows: ExpandedItems;
    widths: number[];
    heights: number[];
};
export enum ActionType {
    EXPAND_COLUMN,
    EXPAND_ROW,
}

type ExpandColumn<T> = {
    key: string;
    index: number;
    descriptionData: T[] | null;
    type: ActionType.EXPAND_COLUMN;
};

type ExpandRow = {
    key: string;
    index: number;
    type: ActionType.EXPAND_ROW;
};

type Action<T> = ExpandColumn<T> | ExpandRow;
const expandReducer = <T extends unknown>(state: State, action: Action<T>): State => {
    switch (action.type) {
        case ActionType.EXPAND_COLUMN: {
            let width = getDescriptionWidth(action.descriptionData) + 10;
            console.log(action);
            if (state.expandedColumns && state.expandedColumns[action.key]) {
                const currWidths = [...state.widths];
                currWidths[action.index] = state.expandedColumns[action.key].isExpanded
                    ? currWidths[action.index] - width
                    : currWidths[action.index] + width;
                return {
                    ...state,
                    expandedColumns: {
                        ...state.expandedColumns,
                        [action.key]: {
                            ...state.expandedColumns[action.key],
                            isExpanded: !state.expandedColumns[action.key].isExpanded,
                        },
                    },
                    widths: currWidths,
                };
            } else {
                const currWidths = [...state.widths];
                currWidths[action.index] = currWidths[action.index] + width;
                return {
                    ...state,
                    expandedColumns: {
                        ...state.expandedColumns,
                        [action.key]: {
                            isExpanded: true,
                            index: action.index,
                        },
                    },
                    widths: currWidths,
                };
            }
        }
        case ActionType.EXPAND_ROW: {
            const currHeights = [...state.heights];
            if (state.expandedRows && state.expandedRows[action.key]) {
                currHeights[action.index] = state.expandedRows[action.key].isExpanded
                    ? currHeights[action.index] - 100
                    : currHeights[action.index] + 100;
                return {
                    ...state,
                    expandedRows: {
                        ...state.expandedRows,
                        [action.key]: {
                            ...state.expandedRows[action.key],
                            isExpanded: !state.expandedRows[action.key].isExpanded,
                        },
                    },
                    heights: currHeights,
                };
            } else {
                currHeights[action.index] = currHeights[action.index] + 100;
                return {
                    ...state,
                    expandedRows: {
                        ...state.expandedRows,
                        [action.key]: {
                            isExpanded: true,
                            index: action.index,
                        },
                    },
                    heights: currHeights,
                };
            }
        }

        default:
            return { expandedColumns: {}, widths: [], heights: [], expandedRows: {} };
    }
};

type DispatchAction<T> = (action: Action<T>) => void;
const ExpandContext = createContext<State>({
    expandedColumns: {},
    expandedRows: {},
    heights: [],
    widths: [],
});

function createExpandDispatchContext<T = any>() {
    return createContext<DispatchAction<T> | undefined>(undefined);
}
const ExpandDispatchContext = createExpandDispatchContext();
type ExpandProviderProps = {
    initialWidths: number[];
    initialHeights: number[];
};
type Dimension = {
    heights: number[];
    widths: number[];
};
const ExpandProvider = (props: PropsWithChildren<ExpandProviderProps>) => {
    const { initialHeights, initialWidths, children } = props;

    const [state, dispatch] = useReducer(expandReducer, {
        expandedColumns: {},
        expandedRows: {},
        widths: initialWidths,
        heights: initialHeights,
    });

    return (
        <ExpandContext.Provider value={state}>
            <ExpandDispatchContext.Provider value={dispatch}>
                {children}
            </ExpandDispatchContext.Provider>
        </ExpandContext.Provider>
    );
};

export { ExpandProvider, ExpandContext, ExpandDispatchContext };
