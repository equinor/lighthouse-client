import { ReleaseControlAtom, releaseControlContext } from '../Atoms/releaseControlAtom';

type SelectorFunction<T, R> = (s: T) => R;

/**
 * Returns the scope change context with the possibility of using selectors
 * Using this hook will subscribe the component to whatever props the selector returns.
 * If you want to get snapshot values and prevent subscribing consider using deref
 * @param selector
 * @returns
 */
export function useReleaseControlContext<R = ReleaseControlAtom>(
    selector?: SelectorFunction<ReleaseControlAtom, R>
): R {
    const select = selector ? selector : (s) => s;

    const { useAtomState } = releaseControlContext;

    return useAtomState(select);
}

export function getReleaseControlSnapshot(): ReleaseControlAtom {
    return releaseControlContext.readAtomValue();
}
