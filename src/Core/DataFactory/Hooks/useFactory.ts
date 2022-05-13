import { getFactoryByFactoryId } from '../Functions/getFactories';
import { Factory } from '../Types/factory';

export interface FactoryData {
    factory?: Factory;
}

export function useFactory(factoryId: string): FactoryData {
    return {
        factory: getFactoryByFactoryId(factoryId),
    };
}
