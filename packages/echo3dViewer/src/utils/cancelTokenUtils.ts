import { CancelToken } from '@esfx/async-canceltoken';

/**
 *  Utils method that coverts a cancel token from @esfx/async-canceltoken
 *  into an abort signal from node
 *
 * @exports
 * @param {CancelToken} token to be converted
 * @returns {AbortSignal} the converted abort signal
 */
export function convertCancelTokenToAbort(token: CancelToken): AbortSignal {
    const abort = new AbortController();
    token.subscribe(() => abort.abort());
    return abort.signal;
}
