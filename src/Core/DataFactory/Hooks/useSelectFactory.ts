import { useCallback } from 'react';
import { setActiveFactoryById } from '../Functions/setActiveFactory';

export function useSelectFactory(factoryId?: string, scope?: Record<string, unknown>): () => void {
    const onClick = useCallback(() => {
        setActiveFactoryById(factoryId, scope);
    }, [factoryId, scope]);
    return onClick;
}
