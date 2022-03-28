import { useContext } from 'react';
import { ReleaseControlContext, ReleaseControlContextState } from './releaseControlAccessContext';

export function useReleaseControlContext(): ReleaseControlContextState {
    return useContext(ReleaseControlContext);
}
