/* eslint-disable no-console */
import { useAtom } from '@dbeining/react-atom';
import { getContext } from '../Api/pageViewerState';
import { ViewState } from '../Types/State';
import { useLocationKey } from './useDataViewerKey';

export function usePageViewer(): ViewState {
    const key = useLocationKey();
    const state = useAtom(getContext());

    if (state[key]) {
        return state[key];
    } else {
        console.warn(`No Pages are  registered on path/key:  ${key}`);
        return {
            title: `Unknown ${key}`,
            shortName: '',
            pages: {},
            onSelect: () => { },
        };
    }
}
