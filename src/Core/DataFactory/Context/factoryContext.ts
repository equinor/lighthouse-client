import { Atom } from '@dbeining/react-atom';
import { createGlobalFactoryState } from '../State/actions';
import { DataFactoryState } from '../State/dataFactoryState';

export const FactoryCoreContext = createGlobalFactoryState({
    factories: {},
});

export function getFactoryContext(): Atom<DataFactoryState> {
    return FactoryCoreContext;
}
