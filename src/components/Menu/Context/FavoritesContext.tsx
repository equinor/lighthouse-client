import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { addFavorites, getFavorites } from '../Utils/favorites';

export interface IFavoritesContext {
    favorites: string[];
    toggleFavorite(appId: string): Promise<void>;
    hasFavorite(appId): boolean;
}

const FavoritesContext = createContext<IFavoritesContext>({} as IFavoritesContext);

export const FavoritesProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    const [state, setState] = useState<string[]>([]);

    useEffect(() => {
        (async () => setState(await getFavorites()))();
    }, []);

    async function toggleFavorite(appId: string): Promise<void> {
        const favorites = await addFavorites(
            !state.includes(appId) ? [...state, appId] : state.filter((f) => f !== appId)
        );
        setState(favorites);
    }

    function hasFavorite(appId: string): boolean {
        return state.includes(appId);
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites: state,
                toggleFavorite,
                hasFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export function useFavoritesContext(): IFavoritesContext {
    return useContext(FavoritesContext);
}
