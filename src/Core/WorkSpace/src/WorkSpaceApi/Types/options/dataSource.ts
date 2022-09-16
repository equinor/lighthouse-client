export type DataSource<T extends Record<PropertyKey, unknown>> = {
    /** Function that returns the api call promise */
    responseAsync: (signal?: AbortSignal) => Promise<Response>;
    /** Function that parses the response to correct format, defaults to just parsing the raw response */
    responseParser?: (Response: Response) => Promise<T[]>;
};
