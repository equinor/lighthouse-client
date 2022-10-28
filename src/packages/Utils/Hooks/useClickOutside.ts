import { MutableRefObject, useEffect } from 'react';
/**
 * Hook to detect `mouseup` and `touchstart` events on DOM elements not part of the `ref` argument
 * @param ref The DOM element to watch for clicks outside of
 * @param handler Function that is fired off when clicks outside of the DOM element are detected. Wrap in useCallback.
 */
export const useClickOutside = (
    ref: MutableRefObject<HTMLElement | null>,
    handler: (evt: Event) => void
): void => {
    useEffect(() => {
        const listener = (evt: Event) => {
            if (!ref.current || ref.current.contains(evt.target as Node)) {
                return;
            }
            handler(evt);
        };

        document.addEventListener('mouseup', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mouseup', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
