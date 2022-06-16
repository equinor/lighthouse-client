export interface SearchItem {
    key: string;
    id: string;
    title: string;
    description: string;
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
    items: SearchItem[];
}

/* Search Request Function, can be a async call to an api or call to localDB/ indexDB */
export type SearchRequest<T> = (searchText: string) => Promise<T[] | undefined>;

/*The item used to register a search*/
export interface SearchConfig<T> {
    type: string;
    searchMapper: (data: T) => SearchResult[] | SearchResult;
    searchRequest: SearchRequest<T>;
}

export type SearchSubscriber = (searchResults: SearchResult[]) => void;

export interface Subscriber {
    [`##id`]: number;
    callBack: SearchSubscriber;
}

export class Search {
    private searchResults: SearchResult[] = [];
    private searchTypes: Record<string, string> = {};
    private searchItems: Map<string, SearchConfig<unknown>> = new Map();
    private subscribers: Subscriber[] = [];
    private subscriberId = 0;

    private searchId = 0;
    private searchText = '';

    static create(): Search {
        return new Search();
    }

    registerSearchItem<T>(searchItem: SearchConfig<T>): void {
        if (this.searchTypes[searchItem.type.toLowerCase()]) {
            console.warn(
                `The type ${searchItem.type} is already registered \n place provide new type name.`
            );
        }
        this.searchTypes[searchItem.type.toLowerCase()] = searchItem.type.toLowerCase();
        this.searchItems.set(searchItem.type.toLowerCase(), searchItem as SearchConfig<unknown>);
    }

    registerSubscriber(subscriber: SearchSubscriber): () => void {
        this.subscriberId++;

        this.subscribers = [
            ...this.subscribers,
            { [`##id`]: this.subscriberId, callBack: subscriber },
        ];

        return this.unsubscribeCreator(this.subscriberId);
    }

    async search(searchText?: string): Promise<void> {
        this.searchInit();
        this.searchText = searchText || '';
        this.searchItems.forEach((searchItem) => {
            this.dispatchSearch(this.searchId, searchItem);
        });
    }

    private searchInit() {
        this.searchId++;
        this.resetSearchResult();
    }

    private async dispatchSearch(
        searchId: number,
        searchItem: SearchConfig<unknown>
    ): Promise<void> {
        const results = searchItem.searchMapper(await searchItem.searchRequest(this.searchText));
        if (searchId === this.searchId)
            this.updateSearchResult(Array.isArray(results) ? results : [results]);
    }

    private updateSearchResult(searchResults: SearchResult[]) {
        const result = [...this.searchResults, ...searchResults];
        this.subscribers.forEach((subscriber) => {
            subscriber.callBack(this.sortGroupeType(result));
        });

        this.searchResults = result;
    }

    private sortGroupeType(searchResults: SearchResult[]) {
        return searchResults.sort(function (a, b) {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    }

    private async resetSearchResult() {
        this.searchResults = [];

        this.subscribers.forEach((subscriber) => {
            subscriber.callBack([]);
        });
    }

    private unsubscribeCreator(subscriberId: number) {
        return (): void => {
            const subscriberIndex = this.subscribers.findIndex(
                (subscriber) => subscriber[`##id`] === subscriberId
            );

            this.subscribers.splice(subscriberIndex, 1);
        };
    }
}
