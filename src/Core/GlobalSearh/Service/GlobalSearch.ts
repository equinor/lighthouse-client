import { useCallback, useEffect, useState } from 'react';
import { Search, SearchConfig, SearchResult } from './SearchApi';

export const globalSearch = new Search();

export function useGlobalSearch(): {
    searchResult: SearchResult[];
    search(searchText?: string | undefined): void;
    registerSearchItem<T>(searchItem: SearchConfig<T>): () => void;
} {
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

    const search = useCallback((searchText?: string | undefined): void => {
        if (!searchText || searchText?.length === 0) {
            setSearchResult([]);
        }
        globalSearch.search(searchText);
    }, []);

    useEffect(() => {
        const searchInstance = globalSearch.registerSubscriber(setSearchResult);
        return () => {
            searchInstance();
        };
    }, []);

    return {
        searchResult,
        search,
        registerSearchItem: globalSearch.registerSearchItem,
    };
}
