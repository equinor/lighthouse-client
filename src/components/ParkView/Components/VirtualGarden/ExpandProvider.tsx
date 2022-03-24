import { createContext, PropsWithChildren, useReducer } from 'react';
import { getDescriptionWidth } from './utils/getDescriptionWidth';
type Expanded = {
    isExpanded: boolean;
    index: number;
};
type ExpandedItems = Record<string, Expanded>;
type State = {
    expandedColumns: ExpandedItems;
    widths: number[];
};
export enum ActionType {
    EXPAND_COLUMN,
}

type ExpandColumn<T> = {
    key: string;
    index: number;
    descriptionData: T[] | null;
    type: ActionType.EXPAND_COLUMN;
};

type Action<T> = ExpandColumn<T>;
const expandReducer = <T extends unknown>(state: State, action: Action<T>): State => {
    switch (action.type) {
        case ActionType.EXPAND_COLUMN: {
            //TODO +10 because of gap/padding
            let width = getDescriptionWidth(action.descriptionData) + 10;
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

        default:
            return { expandedColumns: {}, widths: [] };
    }
};

type DispatchAction<T> = (action: Action<T>) => void;
const ExpandContext = createContext<State>({
    expandedColumns: {},
    widths: [],
});

function createExpandDispatchContext<T = unknown>() {
    return createContext<DispatchAction<T> | undefined>(undefined);
}
const ExpandDispatchContext = createExpandDispatchContext();

type ExpandProviderProps = {
    initialWidths: number[];
};

const ExpandProvider = (props: PropsWithChildren<ExpandProviderProps>) => {
    const { initialWidths, children } = props;

    const [state, dispatch] = useReducer(expandReducer, {
        expandedColumns: {},
        widths: initialWidths,
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
