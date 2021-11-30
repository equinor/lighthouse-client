import { useAtom } from '@dbeining/react-atom';
import { useDataViewerKey } from '../Components/DefaultDataView/Hooks/useDataViewerKey';
import { getContext, ViewConfig } from './DataViewState';

export function useDataViewer<T>(): ViewConfig<T> {
    const key = useDataViewerKey();
    const state = useAtom(getContext());

    if (state[key]) {
        console.log(state[key]);
        return state[key] as ViewConfig<T>;
    } else {
        console.warn(`No DataView registered on path/key:  ${key}`);
        return {
            name: `Unknown DataView ${key}`,
        };
    }
}
