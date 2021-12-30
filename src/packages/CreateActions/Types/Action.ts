export interface Action {
    ['##Id']: string;
    key: string;
    value: string;
    query: Record<string, string>;
}
