import { Atom, deref, swap, useAtom } from '@dbeining/react-atom';
import { useEffect } from 'react';
import { AtomSelector, DefaultAtomAPI } from '../types/atom';

/**
 * Creates a new atom state
 * @type1 The type of your state
 * @type2 optional: The type of your api, must extend DefaultAtomApi
 * @param initialState
 * @param extraProperties
 * @returns
 */
export const createAtom = <Data, Type = DefaultAtomAPI<Data>>(
    initialState: Data,
    extraProperties?: (
        api: DefaultAtomAPI<Data>
    ) => Omit<Type, 'readAtomValue' | 'updateAtom' | 'useAtomState' | 'useOnAtomStateChanged'>
): Type extends DefaultAtomAPI<Data> ? Type : never => {
    const stateAtom = Atom.of<Data>(initialState);

    const defaultApi: DefaultAtomAPI<Data> = {
        readAtomValue: <R = Data>(selector?: AtomSelector<Data, R>) =>
            selector ? selector(deref(stateAtom)) : deref(stateAtom),
        updateAtom: (newVal: Partial<Data> | null) => swap(stateAtom, (s) => ({ ...s, ...newVal })),
        useAtomState: <R = Data>(select?: AtomSelector<Data, R>) =>
            useAtom(stateAtom, {
                select: select ? select : (((s) => s) as unknown as (s: Data) => R),
            }),
        useOnAtomStateChanged: <R = Data>(
            callback: (s: Data) => void,
            select?: AtomSelector<Data, R>
        ) => {
            const s = defaultApi.useAtomState(select);
            useEffect(() => {
                callback(defaultApi.readAtomValue());
                /** Do not add callback */
            }, [s]);
        },
    };

    if (extraProperties) {
        return {
            ...defaultApi,
            ...extraProperties(defaultApi),
        } as Type extends DefaultAtomAPI<Data> ? Type : never;
    }
    return defaultApi as Type extends DefaultAtomAPI<Data> ? Type : never;
};
