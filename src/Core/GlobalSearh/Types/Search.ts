export interface SearchData {
    type: string;
    title: string;
    color: string;
    count: number;
    items: any[];
}

export interface SearchItem {
    type: string;
    id: string;
    title: string;
    description: string;
    index: number;
    uri?: string;
    group?: string;
}

export interface AppSearchItem extends SearchItem {
    type: 'app';
    uri: string;
    group: string;
}
