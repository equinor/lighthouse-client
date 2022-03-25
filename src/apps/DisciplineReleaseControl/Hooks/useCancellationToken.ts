import { useRef } from 'react';

interface Cancellation {
    abort: () => void;
    getSignal: () => AbortSignal;
}

/**
 * Hook for cancelling api calls, when aborting it automatically creates a new signal
 * @returns getSignal and abort function
 */
export function useCancellationToken(): Cancellation {
    const controller = useRef(new AbortController());

    function abort() {
        controller.current.abort();
        controller.current = new AbortController();
    }

    const getSignal = () => controller.current.signal;

    return { abort, getSignal };
}
