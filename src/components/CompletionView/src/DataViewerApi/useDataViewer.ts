/* eslint-disable no-console */
import { useAtom } from '@dbeining/react-atom';
import { useMemo } from 'react';
import { useDataViewerKey } from '../Components/DefaultDataView/Hooks/useDataViewerKey';
import { getContext, ViewConfig } from './DataViewState';

export function useDataViewer<T>(): ViewConfig<T> {
    const key = useDataViewerKey();
    const state = useAtom(getContext());
    const currentView = useMemo(() => state[key], [key, state]);

    if (currentView) {
        return currentView as ViewConfig<T>;
    } else {
        console.warn(`No DataView registered on path/key:  ${key}`);
        return {
            name: `Unknown DataView ${key}`,
        };
    }
}
