import { Factory } from '../Types/factory';

export interface DataFactoryState {
    isActiveFactory?: Factory;
    factoryScope?: Record<string, unknown>;
    factories: {
        [key: string]: Factory;
    };
}
