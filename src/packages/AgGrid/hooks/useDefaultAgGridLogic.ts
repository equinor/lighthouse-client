import { useOutsideClick } from '@equinor/hooks';
import { useState, useRef, useEffect, useImperativeHandle } from 'react';

interface DefaultGridEditorLogic<T> {
    value: T | undefined;
    setValue: (newVal: T | undefined) => void;
    refInput: React.MutableRefObject<HTMLDivElement | null>;
}

export function useDefaultAgGridEditorLogic<T = (string | number) | undefined>(
    inValue: T,
    ref,
    stopEditing: () => void
): DefaultGridEditorLogic<T> {
    const [value, setValue] = useState<T | undefined>(inValue);
    const refInput = useRef<HTMLDivElement | null>(null);

    //Press anywhere outside the text input to stop editing
    useOutsideClick(refInput, stopEditing);

    useEffect(() => {
        // focus on the input
        refInput.current && refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // Send to api!
                return value;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                //Could possibly do access check here
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                return false;
            },
        };
    });

    return {
        value: value,
        setValue: (newVal: T | undefined) => setValue(newVal),
        refInput: refInput,
    };
}
