import { createContext } from 'react';
import { useGlobalClientState } from '../ClientState/ClientState';
import { toggleAppPanel, toggleFullscreenMenu } from '../Functions/Settings';
import { GlobalClientState } from '../Types/GlobalClientState';
import { UIFunctionContext } from '../Types/UIContext';

export type ClientContextState = GlobalClientState & UIFunctionContext;

export const ClientContext = createContext({} as ClientContextState);
interface ClientContextProviderProps {
    children: React.ReactNode;
}

export const ClientContextProvider = ({ children }: ClientContextProviderProps): JSX.Element => {
    const state = useGlobalClientState();

    return (
        <ClientContext.Provider
            value={{
                ...state,
                toggleAppPanel,
                toggleFullscreenMenu,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
