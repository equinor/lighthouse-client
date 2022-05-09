import { DeepImmutable, deref, useAtom } from '@dbeining/react-atom';
import { scopeChangeAtom, ScopeChangeAtom } from '../../Atoms/scopeChangeAtom';

type SelectorFunction<T, R> = (s: T) => R;

/**
 * Returns the scope change context with the possibility of using selectors
 * Using this hook will subscribe the component to whatever props the selector returns.
 * If you want to get snapshot values and prevent subscribing consider using deref
 * @param selector
 * @returns
 */
export function useScopeChangeContext<R = ScopeChangeAtom>(
    selector?: SelectorFunction<ScopeChangeAtom, R>
): DeepImmutable<R> {
    const select = selector ? selector : (s: ScopeChangeAtom) => s;

    return useAtom(scopeChangeAtom, { select: select as (s: ScopeChangeAtom) => R });
}

export function getScopeChangeSnapshot(): ScopeChangeAtom {
    return deref(scopeChangeAtom);
}
