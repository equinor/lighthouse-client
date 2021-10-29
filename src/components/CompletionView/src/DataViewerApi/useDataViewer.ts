import { useAtom } from '@dbeining/react-atom';
import { getContext, ViewConfig } from './DataViewState';

export function useDataViewer<T>(key: string): ViewConfig<T> {
    const state = useAtom(getContext());
    if (state[key]) {
        return state[key] as ViewConfig<T>;
    } else {
        console.warn(`No DataView registered on path/key:  ${key}`);
        return {
            name: `unknown DataView with ${key}`
        };
    }
}
