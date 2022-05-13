import { useEffect, useRef } from 'react';

/**
 * Hook used to determine if a component is mounted
 * @returns boolean
 */
export function useIsMounted(): { current: boolean } {
    const componentIsMounted = useRef(true);
    useEffect(
        () => () => {
            componentIsMounted.current = false;
        },
        []
    );
    return componentIsMounted;
}
