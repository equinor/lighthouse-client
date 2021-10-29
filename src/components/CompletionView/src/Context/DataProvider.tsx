

import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import useClientContext from '../../../../context/clientContext';
import { useDataViewerKey } from '../Components/DeraultDataView/Hooks/useDataViewerKey';
import { useDataViewer } from '../DataViewerApi/useDataViewer';


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
    itemId: string
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
    getData: createCustomAction(
        DataAction.getData, (data: any[]) => ({ data })
    ),
    setSelectedItem: createCustomAction(
        DataAction.setSelected, (itemId: string) => ({ itemId })
    ),
}

export type OfflineDocumentsActionType = typeof DataAction;


export type Action = ActionType<typeof actions>;


const DataContext = createContext({} as DataContextState)


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

const initialState: DataState = {
    data: [],
    itemId: ""
}

export const DataProvider = ({ children }: DataProviderProps) => {
    const key = useDataViewerKey()
    const { name, viewComponent, validator, viewOptions, filterOptions, dataFetcher } = useDataViewer(key)

    const { appConfig, authProvider } = useClientContext();


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
    }

    const setSelected = (itemId: string) => {
        dispatch(actions.setSelectedItem(itemId));
    }

    return (
        <DataContext.Provider value={{
            ...state, getData, setSelected
        }}>{children}</DataContext.Provider>
    )
}

export function useDataContext() {
    return useContext(DataContext)
}

// const api = baseClient(authProvider, [appConfig.procosys])

  // const response = await api.fetch(`https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`, { body: JSON.stringify([]), method: "POST" })

    // const data = JSON.parse(await response.text());
    // dispatch(actions.getData(data));
    // const getChecklist = async (plantId = "PCS$JOHAN_CASTBERG") => {
    //     const response = await api.fetch(`https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`, { body: JSON.stringify([]), method: "POST" })

    //     const data = JSON.parse(await response.text());
    //     dispatch(actions.getData(data));
    // }