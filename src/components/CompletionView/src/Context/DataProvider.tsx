

import { baseClient } from '@equinor/http-client';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import useClientContext from '../../../../context/clientContext';


type DataTypes = Checklist | WorkOrder


interface WorkOrder {
    CommPkg__CommPkgNo: string;
    CommPkg__CommPriority1__Id: string;
    CommPkg__CommPriority2__Id: string;
    CommPkg__Description: string;
    DescriptionShort: string;
    Hyperlink_WoNo: string;
    IccMilestone__Id: string;
    IccSubmilestone__Description: string;
    JobStatus__Id: string;
    MaterialStatus__Id: string;
    ProjectProgress: string;
    Project__Name: string;
    RemainingManhours__Sum: string;
    WoEstimates__EstimatedMhrs__Sum: string;
    WoNo: string;
    WoPlannedStartupDate: string;
    WoResponsible__Id: string;
}

interface Checklist {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number
    Description: string;
    Id: number
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}
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
        const response = await api.fetch(`https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`, { body: JSON.stringify([]), method: "POST" })

        const data = JSON.parse(await response.text());
        dispatch(actions.getData(data));
    }
    const getChecklist = async (plantId = "PCS$JOHAN_CASTBERG") => {
        const response = await api.fetch(`https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`, { body: JSON.stringify([]), method: "POST" })

        const data = JSON.parse(await response.text());
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
