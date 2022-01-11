import { getFactoryContext } from '../Context/factoryContext';
import { dispatch } from '../State/actions';
import { DataFactoryState } from '../State/dataFactoryState';

export function setActiveFactoryById(factoryId?: string, scope?: Record<string, unknown>): void {
    if (!factoryId) return;
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        const isActiveFactory = state.factories[factoryId];
        return {
            ...state,
            isActiveFactory,
            factoryScope: scope,
        };
    });
}
