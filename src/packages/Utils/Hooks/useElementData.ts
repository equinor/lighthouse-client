import { useCallback, useLayoutEffect, useState } from 'react';
import useEventListener from './useEventListener';

interface ElementData {
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    awaitableHeight: number;
}

export function useElementData<T extends HTMLElement = HTMLDivElement>(): [
    (node: T | null) => void,
    ElementData
] {
    // Mutable values like 'ref.current' aren't valid dependencies
    // because mutating them doesn't re-render the component.
    // Instead, we use a state as a ref to be reactive.
    const [ref, setRef] = useState<T | null>(null);
    const [size, setSize] = useState<ElementData>({
        width: 0,
        height: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        awaitableHeight: 0,
    });

    const { top, bottom, left, right } = ref?.getBoundingClientRect().toJSON() || {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    // Prevent too many rendering using useCallback
    const handleSize = useCallback(() => {
        setSize({
            width: ref?.offsetWidth || 0,
            height: ref?.offsetHeight || 0,
            top: top || 0,
            bottom: bottom || 0,
            left: left || 0,
            right: right || 0,
            awaitableHeight: window.innerHeight - (top || 0),
        });
    }, [ref?.offsetHeight, ref?.offsetWidth, top, bottom, left, right]);

    useEventListener('resize', handleSize);

    useEventListener('transitionend', handleSize);

    useLayoutEffect(() => {
        handleSize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.offsetHeight, ref?.offsetWidth, top, bottom, left, right]);

    return [setRef, size];
}
