import { storage } from '@equinor/lighthouse-utils';

const APP_FAVORITES = 'appFavoritesIds';

export async function getFavorites(): Promise<string[]> {
    const favorites = storage.getItem<string[]>(APP_FAVORITES);

    if (!favorites) return [];
    if (typeof favorites === 'string') {
        return [favorites];
    }
    return favorites;
}

export async function addFavorites(favorites: string[]): Promise<string[]> {
    storage.setItem(APP_FAVORITES, favorites);
    return favorites;
}
