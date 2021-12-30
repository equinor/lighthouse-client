/* Search Request Function, can be a async call to an api or call to localDB/ indexDB */
export type SearchRequest<T> = (searchText: string) => Promise<T[] | undefined>;

/*The item used to register a search*/
export interface SearchItem<T> {
    type: string;
    map: {
        title: keyof T;
        description?: keyof T;
    };
    searchRequest: SearchRequest<T>;
}
