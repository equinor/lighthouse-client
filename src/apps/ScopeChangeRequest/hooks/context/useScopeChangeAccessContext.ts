import { DeepImmutable, useAtom } from '@dbeining/react-atom';
import { ScopeChangeAtom, scopeChangeAtom } from '../../Atoms/scopeChangeAtom';

interface Selector<T, R> {
    select?: (s: T) => R;
}

/**
 * Returns the scope change context with the possibility of using selectors
 * Using this hook will subscribe the component to whatever props the selector returns.
 * If you want to get snapshot values and prevent subscribing consider using deref
 * @param selector
 * @returns
 */
export function useScopeChangeContext<R extends unknown>(
    selector?: Selector<ScopeChangeAtom, R>
): DeepImmutable<R> {
    const select = selector?.select ? selector.select : (s: ScopeChangeAtom) => s as R;

    return useAtom(scopeChangeAtom, { select });
}
