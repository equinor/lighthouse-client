import { createContext } from 'react';
import { useGlobalClientState } from '../ClientState/ClientState';
import { GlobalClientState } from '../Types/GlobalClientState';

export type ClientContextState = GlobalClientState;

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
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};
