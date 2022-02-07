import { useCancellation } from '@equinor/Utils';
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { getType } from 'typesafe-actions';
import { useDashboard } from '../Hooks/useDashboard';
import { DashboardInstance } from '../Types/State';
import { Action, actions } from './DataActions';

export interface DataState {
    dashboardId: string;
    title: string;
    data: any[];
    instance: DashboardInstance<unknown>;
}
interface DataContextState extends DataState {
    getData: VoidFunction;
}
interface DataProviderProps {
    children: React.ReactNode;
    dashboardId: string;
}

type VoidFunction = () => void;

const DataContext = createContext({} as DataContextState);

export function Reducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.setData):
            return { ...state, data: action.data };
        case getType(actions.setInstance):
            return { ...action.instance };

        default:
            return state;
    }
}

export const DataProvider = ({ children, dashboardId }: DataProviderProps): JSX.Element => {
    const instance = useDashboard(dashboardId);
    const { abortController, viewId } = useCancellation(dashboardId);
    const { title } = instance;
    const [state, dispatch] = useReducer(Reducer, { instance, data: [], dashboardId, title });

    const getData = useCallback(async () => {
        if (instance.dataSource) {
            const data = await instance.dataSource(abortController);
            if (viewId !== dashboardId) {
                return;
            }
            if (instance.validator) {
                dispatch(actions.setData(instance.validator(data)));
                return;
            }
            // eslint-disable-next-line no-console
            console.warn(
                `Data may not be valid. Data validator is not registered for ${instance.title}.`
            );
            dispatch(actions.setData(data));
        }
    }, [instance]);

    useEffect(() => {
        dispatch(actions.setInstance({ instance, data: [], dashboardId, title }));
    }, [dashboardId, instance, title]);

    return (
        <DataContext.Provider
            value={{
                ...state,
                getData,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export function useDashboardDataContext(): DataContextState {
    return useContext(DataContext);
}
