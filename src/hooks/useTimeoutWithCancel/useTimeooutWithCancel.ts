import { useRef } from 'react';

export const useTimeoutWithCancel = (): ((callback: () => void, ms?: number) => void) => {
    const timerId = useRef<NodeJS.Timeout | null>(null);

    function run(callback: () => void, ms?: number) {
        timerId.current && clearTimeout(timerId.current);

        timerId.current = setTimeout(callback, ms);
    }

    return run;
};
