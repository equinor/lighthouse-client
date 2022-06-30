import { NavigateFunction } from 'react-router';

export interface SearchDescription {
    label: string;
    value: string;
}
export interface SearchItem {
    key: string;
    id: string;
    title: string;
    description?: string | SearchDescription[];
    uri?: string;
    group?: string;
    objects?: any;
}

/**
 * This interface represents the result, everything gets mapped
 * to this interface to be displayed.
 *
 * @interface SearchResult
 */

export interface SearchResult {
    type: string;
    title: string;
    color: string;
    count?: number;
    action(id: string, item: SearchItem, navigate: NavigateFunction): void;
    appAction?(id: string, navigate: NavigateFunction): void;
    items: SearchItem[];
}

/* Search Request Function, can be a async call to an api or call to localDB/ indexDB */
export type SearchRequest<T> = (
    searchText: string,
    signal: AbortSignal
) => Promise<T[] | undefined> | Promise<T | undefined> | T[] | T | undefined;

/*The item used to register a search*/
export interface SearchConfig<T> {
    type: string;
    searchMapper:
        | ((data?: T[]) => SearchResult[] | SearchResult | undefined)
        | ((data?: T) => SearchResult[] | SearchResult | undefined);
    searchRequest: SearchRequest<T>;
}

export type SearchSubscriber = (searchResults: SearchResult[]) => void;
export type IsSearchSubscriber = (searchLoadingStatus: Record<string, boolean>) => void;

export interface Subscriber {
    [`##id`]: number;
    callBack: SearchSubscriber;
    isSearchingCallBack?: IsSearchSubscriber;
}

export class Search {
    private searchLoadingStatus: Record<string, boolean> = {};
    private searchResults: SearchResult[];
    private searchTypes: Record<string, string>;
    private searchItems: Map<string, SearchConfig<unknown>> = new Map();
    private subscribers: Subscriber[] = [];
    private subscriberId = 0;
    private abortController: AbortController | undefined;

    private searchId = 0;
    private searchText = '';

    constructor() {
        this.searchResults = [];
        this.searchTypes = {};
    }

    public registerSearchItem = <T>(searchItem: SearchConfig<T>): (() => void) => {
        if (this.searchTypes[searchItem.type.toLowerCase()]) {
            console.warn(
                `The type ${searchItem.type} is already registered \n place provide new type name.`
            );
        }
        this.searchTypes[searchItem.type.toLowerCase()] = searchItem.type.toLowerCase();
        this.searchItems.set(searchItem.type.toLowerCase(), searchItem as SearchConfig<unknown>);
        return () => {
            this.searchItems.delete(searchItem.type.toLowerCase());
        };
    };

    public registerSubscriber = (
        subscriber: SearchSubscriber,
        isSearchingCallBack?: IsSearchSubscriber
    ): (() => void) => {
        this.subscriberId++;

        this.subscribers = [
            ...this.subscribers,
            { [`##id`]: this.subscriberId, callBack: subscriber, isSearchingCallBack },
        ];

        return this.unsubscribeCreator(this.subscriberId);
    };

    search = async (searchText?: string): Promise<void> => {
        this.searchInit();
        if (searchText && searchText.length > 0) {
            this.searchText = searchText || '';
            this.abortController = new AbortController();
            this.searchItems.forEach((searchItem) => {
                this.searchLoadingStatus[searchItem.type] = true;
                this.abortController &&
                    this.dispatchSearch(this.searchId, searchItem, this.abortController.signal);
            });
        }
    };

    private searchInit = () => {
        this.searchId++;
        Object.keys(this.searchLoadingStatus).forEach(
            (key) => (this.searchLoadingStatus[key] = false)
        );
        this.abortController?.abort();
        this.resetSearchResult();
    };

    private dispatchSearch = async (
        searchId: number,
        searchItem: SearchConfig<any>,
        signal: AbortSignal
    ): Promise<void> => {
        try {
            const results = searchItem.searchMapper(
                await searchItem.searchRequest(this.searchText, signal)
            );
            if (searchId === this.searchId && results) {
                this.updateSearchResult(Array.isArray(results) ? results : [results]);
            }
            this.searchLoadingStatus[searchItem.type] = false;
        } catch (error) {
            this.searchLoadingStatus[searchItem.type] = false;
        }
    };

    private updateSearchResult = (searchResults: SearchResult[]) => {
        const result = [...this.searchResults, ...searchResults];
        this.subscribers.forEach((subscriber) => {
            subscriber.callBack(this.sortGroupeType(result));
            subscriber.isSearchingCallBack &&
                subscriber.isSearchingCallBack(this.searchLoadingStatus);
        });

        this.searchResults = result;
    };

    private sortGroupeType = (searchResults: SearchResult[]) => {
        return searchResults.sort(function (a, b) {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    };

    private resetSearchResult = () => {
        this.searchResults = [];

        this.subscribers.forEach((subscriber) => {
            subscriber.callBack([]);
        });
    };

    private unsubscribeCreator = (subscriberId: number) => {
        return (): void => {
            this.subscribers = this.subscribers.filter((s) => s['##id'] !== subscriberId);
        };
    };
}
