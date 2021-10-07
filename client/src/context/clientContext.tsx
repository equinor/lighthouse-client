

import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

interface ClientState {
    appsPanelActive: boolean;

}

interface ClientContextState extends ClientState {
    toggleAppPanel: VoidFunction;
}

interface ClientContextProviderProps {
    children: React.ReactNode;
}

type VoidFunction = () => void;

export enum OfflineDocumentsAction {
    toggleAppPanel = 'toggleAppPanel',
}

export const actions = {
    toggleAppPanel: createCustomAction(
        OfflineDocumentsAction.toggleAppPanel,
    ),
}

export type OfflineDocumentsActionType = typeof OfflineDocumentsAction;


export type Action = ActionType<typeof actions>;


const ClientContext = createContext({} as ClientContextState)


export function ClientReducer(state: ClientState, action: Action): ClientState {
    switch (action.type) {
        case getType(actions.toggleAppPanel):
            return { ...state, appsPanelActive: !state.appsPanelActive };
        default:
            return state;
    }
}

const initialState: ClientState = {
    appsPanelActive: false
}

export const ClientContextProvider = ({ children }: ClientContextProviderProps) => {

    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const toggleAppPanel = () => {
        dispatch(actions.toggleAppPanel())
    }

    return (
        <ClientContext.Provider value={{
            ...state, toggleAppPanel
        }}>{children}</ClientContext.Provider>
    )
}

export default function useClientContext() {
    const appValue = useContext(ClientContext)
    return appValue;
}
