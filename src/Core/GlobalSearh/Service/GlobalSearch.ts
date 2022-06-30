import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, SearchConfig, SearchResult } from './SearchApi';

export const globalSearch = new Search();

export function useGlobalSearch(): {
    searchResult: SearchResult[];
    search(searchText?: string | undefined): void;
    isSearching: boolean;
    registerSearchItem<T>(searchItem: SearchConfig<T>): () => void;
} {
    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const [searchLoadingStatus, setSearchLoadingStatus] = useState<Record<string, boolean>>({});

    const search = useCallback((searchText?: string | undefined): void => {
        if (!searchText || searchText?.length === 0) {
            setSearchResult([]);
        }
        globalSearch.search(searchText);
    }, []);

    const isSearching = useMemo(() => {
        const loadingStatus = Object.values(searchLoadingStatus);
        return loadingStatus.length > 0 && loadingStatus.every((i) => i === true);
    }, [searchLoadingStatus]);

    useEffect(() => {
        const searchInstance = globalSearch.registerSubscriber(
            setSearchResult,
            setSearchLoadingStatus
        );
        return () => {
            searchInstance();
        };
    }, []);

    return {
        searchResult,
        search,
        isSearching,
        registerSearchItem: globalSearch.registerSearchItem,
    };
}
