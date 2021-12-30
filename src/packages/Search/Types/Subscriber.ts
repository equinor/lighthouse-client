import { SearchResult } from './SearchResult';

export type SearchSubscriber = (searchResults: SearchResult[]) => void;

export interface Subscriber {
    [`##id`]: number;
    callBack: SearchSubscriber;
}
