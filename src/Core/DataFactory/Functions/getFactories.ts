import { getFactoryContext } from '../Context/factoryContext';
import { readState } from '../State/actions';
import { Factory } from '../Types/factory';

export function getFactoryByFactoryId(factoryId: string): Factory | undefined {
    return readState(getFactoryContext(), (state) => state.factories[factoryId]);
}

export function getAllFactories(): Factory[] {
    return Object.values(readState(getFactoryContext(), (state) => state.factories)) || [];
}

export function getFactoriesByFactoryIds(factoryIds: string[]): Factory[] {
    const factories: Factory[] = [];
    factoryIds.forEach((factoryId) => {
        const factory = getFactoryByFactoryId(factoryId);
        if (factory) {
            factories.push(factory);
        }
    });
    return factories;
}
