

import { baseClient } from '@equinor/http-client';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import useClientContext from '../../../../context/clientContext';



interface DataState {
    data: any[];

}

interface DataContextState extends DataState {
    getData: VoidFunction;
}

interface DataProviderProps {
    children: React.ReactNode;
}


type VoidFunction = () => void;


export enum DataAction {
    getData = 'getData',
}

export const actions = {
    getData: createCustomAction(
        DataAction.getData, (data: any[]) => ({ data })
    ),
}

export type OfflineDocumentsActionType = typeof DataAction;


export type Action = ActionType<typeof actions>;


const DataContext = createContext({} as DataContextState)


export function ClientReducer(state: DataState, action: Action): DataState {
    switch (action.type) {
        case getType(actions.getData):
            return { ...state, data: action.data };
        default:
            return state;
    }
}

const initialState: DataState = {
    data: []
}

export const DataProvider = ({ children }: DataProviderProps) => {
    const { appConfig, authProvider } = useClientContext();

    const api = baseClient(authProvider, [appConfig.procosys])

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const getData = async (plantId = "PCS$JOHAN_CASTBERG") => {
        const response = await api.fetch(`https://procosyswebapitest.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`, { body: JSON.stringify([]), method: "POST" })

        const data = JSON.parse(await response.text());
        console.log("DATA", data);
        dispatch(actions.getData(data));
    }

    return (
        <DataContext.Provider value={{
            ...state, getData
        }}>{children}</DataContext.Provider>
    )
}

export function useDataContext() {
    return useContext(DataContext)
}
