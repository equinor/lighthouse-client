import { clearActiveFactory } from '../Functions/clearActiveFactory';
import { getFactoryByFactoryId } from '../Functions/getFactories';
import { setActiveFactoryById } from '../Functions/setActiveFactory';
import { Factory } from '../Types/factory';

export interface FactoryData {
    factory?: Factory;
    setSelected: () => void;
    clearSelected: () => void;
}

export function useFactory(factoryId: string): FactoryData {
    function setSelected(): void {
        setActiveFactoryById(factoryId);
    }
    function clearSelected(): void {
        clearActiveFactory();
    }

    return {
        factory: getFactoryByFactoryId(factoryId),
        setSelected,
        clearSelected,
    };
}
