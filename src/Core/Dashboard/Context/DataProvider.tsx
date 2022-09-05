import { useCancellation } from '@equinor/lighthouse-utils';
import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { getType } from 'typesafe-actions';
import { useDashboard } from '../Hooks/useDashboard';
import { DashboardInstance } from '../Types/State';
import { Action, actions } from './DataActions';

export interface DataState {
    dashboardId: string;
    title: string;
    data: any[];
    instance: DashboardInstance<Record<PropertyKey, unknown>>;
    isLoading: boolean;
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
        case getType(actions.setLoading):
            return { ...state, isLoading: action.isLoading };
        default:
            return state;
    }
}

export const DataProvider = ({ children, dashboardId }: DataProviderProps): JSX.Element => {
    const instance = useDashboard(dashboardId);
    const { abortController, viewId } = useCancellation(dashboardId);
    const { title } = instance;
    const [state, dispatch] = useReducer(Reducer, {
        instance,
        data: [],
        dashboardId,
        title,
        isLoading: false,
    });

    const getData = useCallback(async () => {
        dispatch(actions.setLoading(true));
        if (instance.dataSource) {
            try {
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
            } catch {
                //TODO: Error handling, e.g. toaster
            } finally {
                dispatch(actions.setLoading(false));
            }
        }
    }, [instance]);

    useEffect(() => {
        dispatch(actions.setInstance({ instance, data: [], dashboardId, title, isLoading: true }));
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
