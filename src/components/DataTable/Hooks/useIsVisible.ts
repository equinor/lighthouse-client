import { useState } from 'react';

export function useIsVisible(
    itemHeight: number,
    ref: HTMLElement,
    data: any[]
) {
    const [numVisibleItems] = useState(Math.trunc(800 / itemHeight));
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(numVisibleItems);

    function scrollPos() {
        let currentIndx = Math.trunc(ref.scrollTop / itemHeight);
        currentIndx =
            currentIndx - numVisibleItems >= data.length
                ? currentIndx - numVisibleItems
                : currentIndx;
        if (currentIndx !== start) {
            setStart(currentIndx);
            setEnd(
                currentIndx + numVisibleItems >= data.length
                    ? data.length - 1
                    : currentIndx + numVisibleItems
            );
        }
    }

    return {
        start,
        end,
        scrollPos,
        height: data.length * itemHeight
    };
}
