export type AtomSelector<T, R> = (val: T) => R;

type OnAtomStateChanged<T> = <R = T>(callback: (s: T) => void, select?: AtomSelector<T, R>) => void;

type SelectFunction<T> = <R = T>(selector?: AtomSelector<T, R>) => R;

export interface DefaultAtomAPI<DataType> {
    /**
     * Will subscribe the component to the atom state
     * If the selector is an expensive computation consider wrapping it in useCallback
     */
    useAtomState: SelectFunction<DataType>;
    /**
     * Will read a snapshot of the current value.
     * Usually called inside functions
     */
    readAtomValue: <R = DataType>(selector?: AtomSelector<DataType, R> | undefined) => R | DataType;
    /**
     * Do not expose update like this in an atom api.
     */
    updateAtom: (newVal: Partial<DataType> | null) => void;
    /**
     * Pass in a select function to subscribe to a specific part of the state
     * If the selector is an expensive computation consider wrapping it in useCallback
     */
    useOnAtomStateChanged: OnAtomStateChanged<DataType>;
}
