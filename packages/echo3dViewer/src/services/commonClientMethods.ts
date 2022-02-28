import { CancelError } from '@esfx/async-canceltoken';
/**
 * Api fetch wrapper that accesses the access token and attaches it to the fetch call
 * Will throw an error if no access token acquired
 *
 * @exports
 * @param {(() => Promise<string | undefined>)} getAccessToken method that returns a promise with the Access token, and undefined if no access token could be acquired. The token must be a Bearer token, but should NOT contain "Bearer "
 * @returns {*}  {({
 *     fetch: (requestInfo : RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
 * })} a object with the wrapped fetched method
 */
export function customHttp(getAccessToken: () => Promise<string | undefined>): {
    fetch: (requestInfo: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
} {
    return {
        /**
         * Helper method to inject a Custom HTTP error handling in ApiClients
         *
         * Both handles authorization but also Cancellation
         *
         * @param {RequestInfo} requestInfo  the request information about what should be fetch
         * @param {RequestInit | undefined} init an object containing any custom settings that you want to apply to the request.
         * @returns {Promise<Response>} the response returned from the fetch
         */
        fetch: async (requestInfo: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
            const accessToken = await getAccessToken();

            if (!accessToken) throw new Error('getAccessToken did not return an access token.');

            let newInit: RequestInit = {};
            newInit = {
                ...init,
                headers: {
                    ...init?.headers,
                    Authorization: `Bearer ${accessToken}`
                }
            };

            try {
                return await fetch(requestInfo, newInit);
            } catch (ex) {
                if (ex instanceof DOMException && ex.name === 'AbortError') {
                    throw new CancelError(ex.message);
                } else throw ex;
            }
        }
    };
}
