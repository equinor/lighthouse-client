import { AuthenticationProvider } from '@equinor/authentication';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AppConfig } from '../Types/AppConfig';

interface ClientState {
    appsPanelActive: boolean;
    fullscreenMenuActive: boolean;
}

interface ClientContextState extends ClientState {
    toggleAppPanel: VoidFunction;
    toggleFullscreenMenu: VoidFunction;
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
}

interface ClientContextProviderProps {
    children: React.ReactNode;
}

type VoidFunction = () => void;

export enum OfflineDocumentsAction {
    toggleAppPanel = 'toggleAppPanel',
    toggleFullscreenMenu = 'toggleFullscreenMenu',
}

export const actions = {
    toggleAppPanel: createCustomAction(OfflineDocumentsAction.toggleAppPanel),
    toggleFullscreenMenu: createCustomAction(OfflineDocumentsAction.toggleFullscreenMenu),
};

export type OfflineDocumentsActionType = typeof OfflineDocumentsAction;

export type Action = ActionType<typeof actions>;

const ClientContext = createContext({} as ClientContextState);

export function ClientReducer(state: ClientState, action: Action): ClientState {
    switch (action.type) {
        case getType(actions.toggleAppPanel):
            return { ...state, appsPanelActive: !state.appsPanelActive };
        case getType(actions.toggleFullscreenMenu):
            return { ...state, fullscreenMenuActive: !state.fullscreenMenuActive };
        default:
            return state;
    }
}

const initialState: ClientState = {
    appsPanelActive: false,
    fullscreenMenuActive: false,
};

// Add AppConfig and authProvider from hook
export const ClientContextProvider = ({ children }: ClientContextProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(ClientReducer, initialState);

    const toggleAppPanel = () => {
        dispatch(actions.toggleAppPanel());
    };

    const toggleFullscreenMenu = () => {
        dispatch(actions.toggleFullscreenMenu());
    };

    return (
        <ClientContext.Provider
            value={{
                ...state,
                appConfig,
                authProvider,
                toggleAppPanel,
                toggleFullscreenMenu,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};

export function useClientContext(): ClientContextState {
    return useContext(ClientContext);
}
