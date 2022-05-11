import { useCallback } from 'react';
import { getFactoryByFactoryId } from '../Functions/getFactories';

export function useSelectFactory(factoryId: string): () => void {
    return useCallback(() => getFactoryByFactoryId(factoryId)?.onClick(), [factoryId]);
}
