import { useEffect, useRef } from 'react';

export const useCancellation = (viewId: string) => {
    const currentAbortController = useRef<AbortController>();
    const viewIdRef = useRef<string>('');

    if (currentAbortController.current && viewIdRef.current !== viewId) {
        currentAbortController.current.abort();
    }
    if (viewIdRef.current !== viewId) {
        viewIdRef.current = viewId;
        currentAbortController.current = new AbortController();
    }

    useEffect(() => {
        return () => {
            currentAbortController.current?.abort();
            viewIdRef.current = '';
            currentAbortController.current = undefined;
        };
    }, []);
    return {
        abortController: currentAbortController.current,
        viewId: viewIdRef.current,
    };
};
