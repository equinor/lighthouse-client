import { getFactoryContext } from '../Context/factoryContext';
import { dispatch } from '../State/actions';
import { DataFactoryState } from '../State/dataFactoryState';
import { Factory } from '../Types/factory';

export function createDataFactory(factory: Factory): void {
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        if (state.factories[factory.factoryId]) {
            // eslint-disable-next-line no-console
            console.warn('Factory already is Registered!');
            return state;
        }
        const factories = state.factories;
        factories[factory.factoryId] = {
            ...factory,
        };

        return {
            ...state,
            factories,
        };
    });
}
