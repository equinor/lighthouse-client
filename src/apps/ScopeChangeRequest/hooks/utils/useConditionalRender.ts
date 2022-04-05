import { useState } from 'react';

interface ConditionalRender {
    set: (value: boolean) => void;
    isShowing: boolean;
    Component: () => JSX.Element | null;
    toggle: () => void;
}

/**
 * Pass in a component and place the returned component in your JSX. Call the functions to hide/show the component
 * @param Component
 * @returns
 */
export function useConditionalRender(Component: JSX.Element): ConditionalRender {
    const [isShowing, setIsShowing] = useState<boolean>(false);

    function toggle() {
        setIsShowing((prev) => !prev);
    }

    return {
        Component: () => (isShowing ? Component : null),
        set: setIsShowing,
        isShowing,
        toggle,
    };
}
