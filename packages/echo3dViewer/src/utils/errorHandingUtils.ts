import { CancelError } from '@esfx/async-canceltoken';

/**
 * Check if a "error" is an CancelError or a DOMException-AbortError. This indicates that it was canceled by user/flow request.
 *
 * @param {Error} error The error
 * @param {boolean} ensureErrorInput Set to false if you dont care that the input was an Error at all. This true by
 *   default to catch developer errors
 * @returns {boolean} True if the Input error indicates intentional cancellation
 */
export const isIntentionallyCancelled = (error: Error | unknown, ensureErrorInput = true): boolean => {
    if (error instanceof CancelError) return true;

    // Some times the CancelError is not thrown. Not able to figure out what triggers it.
    if (error instanceof DOMException && error.name === 'AbortError') return true;

    if (ensureErrorInput && !(error instanceof Error)) {
        // eslint-disable-next-line no-console -- This is a warning to avoid mistakes.
        console.warn(
            `Tried to check if a non-'Error' was intentionally canceled. Was type ${typeof error}: ${JSON.stringify(
                error
            )}. If this is intentional add ensureErrorInput=false parameter`
        );
    }

    return false;
};
