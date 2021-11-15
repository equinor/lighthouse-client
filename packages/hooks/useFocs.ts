import { useRef } from 'react';

export const useFocus = () => {
    const htmlElRef = useRef<HTMLInputElement>(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return { htmlElRef, setFocus };
};
