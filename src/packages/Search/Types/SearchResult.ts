/**
 * This interface represents the result, everything gets mapped
 * to this interface to be displayed.
 *
 * @interface SearchResult
 */
export interface SearchResult {
    type: string;
    title: string;
    description?: string;
}
