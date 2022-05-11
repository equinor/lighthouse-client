import { Factory } from '../Types/factory';

export interface DataFactoryState {
    factoryScope?: Record<string, unknown>;
    factories: {
        [key: string]: Factory;
    };
}
