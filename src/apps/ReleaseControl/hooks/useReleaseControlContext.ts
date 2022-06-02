import { DeepImmutable, deref, useAtom } from '@dbeining/react-atom';
import { ReleaseControlAtom, releaseControlAtom } from '../Atoms/releaseControlAtom';

type SelectorFunction<T, R> = (s: T) => R;

/**
 * Returns the release control context with the possibility of using selectors
 * Using this hook will subscribe the component to whatever props the selector returns.
 * If you want to get snapshot values and prevent subscribing consider using deref
 * @param selector
 * @returns
 */
export function useReleaseControlContext<R = ReleaseControlAtom>(
    selector?: SelectorFunction<ReleaseControlAtom, R>
): DeepImmutable<R> {
    const select = selector ? selector : (s: ReleaseControlAtom) => s;

    return useAtom(releaseControlAtom, { select: select as (s: ReleaseControlAtom) => R });
}

export function getReleaseControlSnapshot(): ReleaseControlAtom {
    return deref(releaseControlAtom);
}
