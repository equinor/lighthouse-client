// Search State

import { SearchItem } from '../Types/SearchItem';
import { SearchResult } from '../Types/SearchResult';
import { SearchSubscriber, Subscriber } from '../Types/Subscriber';

export class Search {
    private searchResults: SearchResult[] = [];
    private searchTypes: Record<string, string> = {};
    private searchItems: Map<string, SearchItem<unknown>> = new Map();
    private subscribers: Subscriber[] = [];
    private subscriberId = 0;
    private types: string[] = [];
    private searchId = 0;
    private searchText = '';

    create(): Search {
        return new Search();
    }

    registerSearchItem<T>(searchItem: SearchItem<T>): void {
        if (this.searchTypes[searchItem.type.toLowerCase()]) {
            console.warn(
                `The type ${searchItem.type} is already registered \n place provide new type name.`
            );
        }
        this.searchTypes[searchItem.type.toLowerCase()] = searchItem.type.toLowerCase();
        this.searchItems.set(searchItem.type.toLowerCase(), searchItem as SearchItem<unknown>);
    }

    registerMiddleware(): void {
        // register middleware here
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

    private async dispatchSearch(searchId: number, searchItem: SearchItem<unknown>): Promise<void> {
        const results: SearchResult[] = this.searchMapper(
            await searchItem.searchRequest(this.searchText),
            searchItem
        );
        if (searchId === this.searchId) this.updateSearchResult(results);
    }

    private searchMapper<T>(result: T[] | undefined, searchItem: SearchItem<T>): SearchResult[] {
        if (!result) return [];
        return result.map((resultItem) => {
            const description =
                searchItem.map.description && `${resultItem[searchItem.map.description]}`;

            return {
                type: searchItem.type,
                title: `${resultItem[searchItem.map.title]}`,
                description,
            };
        });
    }

    private updateSearchResult(searchResults: SearchResult[]) {
        const result = this.filterTypes([...this.searchResults, ...searchResults]);
        this.subscribers.forEach((subscriber) => {
            subscriber.callBack(this.sort(result));
        });

        this.searchResults = result;
    }

    private filterTypes(searchResults: SearchResult[]) {
        if (this.types.length > 0) {
            return searchResults.filter((result) => this.types.includes(result.type.toLowerCase()));
        }

        return searchResults;
    }

    private sort(searchResults: SearchResult[]) {
        return searchResults.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
    }

    private async resetSearchResult() {
        this.searchResults = [];
        this.types = [];

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
