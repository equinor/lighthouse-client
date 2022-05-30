import { RefObject, useCallback, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler
): void {
    const handleEvent = useCallback(
        (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) {
                return;
            } else {
                handler(e);
            }
        },
        [handler, ref]
    );

    useEffect(() => {
        window.addEventListener('click', handleEvent);

        return () => {
            window.removeEventListener('click', handleEvent);
        };
    }, [handleEvent]);
}
