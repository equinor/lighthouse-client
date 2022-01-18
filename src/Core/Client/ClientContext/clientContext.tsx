import { AuthenticationProvider } from '@equinor/authentication';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AppConfig } from '../Types/Settings';

interface ClientState {
    appsPanelActive: boolean;
}

interface ClientContextState extends ClientState {
    toggleAppPanel: VoidFunction;
    appConfig: AppConfig;

    authProvider: AuthenticationProvider;
}

interface ClientContextProviderProps {
    children: React.ReactNode;
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
}

type VoidFunction = () => void;

export enum OfflineDocumentsAction {
    toggleAppPanel = 'toggleAppPanel',
}

export const actions = {
    toggleAppPanel: createCustomAction(OfflineDocumentsAction.toggleAppPanel),
};

export type OfflineDocumentsActionType = typeof OfflineDocumentsAction;

export type Action = ActionType<typeof actions>;

const ClientContext = createContext({} as ClientContextState);

export function ClientReducer(state: ClientState, action: Action): ClientState {
    switch (action.type) {
        case getType(actions.toggleAppPanel):
            return { ...state, appsPanelActive: !state.appsPanelActive };
        default:
            return state;
    }
}

const initialState: ClientState = {
    appsPanelActive: false,
};

export const ClientContextProvider = ({
    children,
    appConfig,
    authProvider,
}: ClientContextProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const toggleAppPanel = () => {
        dispatch(actions.toggleAppPanel());
    };

    return (
        <ClientContext.Provider
            value={{
                ...state,
                appConfig,
                authProvider,
                toggleAppPanel,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};

export function useClientContext(): ClientContextState {
    return useContext(ClientContext);
}
