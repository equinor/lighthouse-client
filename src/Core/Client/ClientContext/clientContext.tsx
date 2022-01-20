import { createContext, useContext } from 'react';
import { useGlobalClientState } from '../ClientState/ClientState';
import { toggleAppPanel, toggleFullscreenMenu } from '../Functions/Settings';
import { GlobalClientState } from '../Types/GlobalClientState';

interface ClientContextState extends GlobalClientState {
    toggleAppPanel: VoidFunction;
    toggleFullscreenMenu: VoidFunction;
}

type VoidFunction = () => void;

const ClientContext = createContext({} as ClientContextState);
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

export function useClientContext(): ClientContextState {
    return useContext(ClientContext);
}
