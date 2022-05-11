import { useAtom } from '@dbeining/react-atom';

import { useEffect, useState } from 'react';
import { getFactoryContext } from '../Context/factoryContext';
import { getFactoryByFactoryId } from '../Functions/getFactories';
import { Factories, Factory } from '../Types/factory';

export function useFactories(factoryIds?: string[]): Factories {
    const state = useAtom(getFactoryContext());
    const [factories, setFactories] = useState<Factory[]>(Object.values(state) || []);

    useEffect(() => {
        if (!factoryIds) {
            setFactories(Object.values(state.factories));
            return;
        }
        const factories: Factory[] = [];
        factoryIds.forEach((factoryId) => {
            const factory = getFactoryByFactoryId(factoryId);
            if (factory) {
                factories.push(factory);
            }
        });
        setFactories(factories);
    }, [factoryIds, state]);

    return { factories, scope: state.factoryScope };
}
