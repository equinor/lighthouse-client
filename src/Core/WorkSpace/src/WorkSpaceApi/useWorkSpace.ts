/* eslint-disable no-console */
import { DeepImmutableObject, useAtom } from '@dbeining/react-atom';
import { useMemo } from 'react';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useWorkspaceKey';
import { getWorkSpaceContext, WorkSpaceConfig } from './workspaceState';

export function useWorkSpace(): DeepImmutableObject<WorkSpaceConfig<unknown>> {
    const key = useWorkSpaceKey();
    const state = useAtom(getWorkSpaceContext());
    const currentView = useMemo(() => state[key], [key, state]);

    if (currentView) {
        return currentView;
    } else {
        console.warn(`No workspace registered on path/key:  ${key}`);
        return {
            name: `Unknown Workspace ${key}`,
            objectIdentifier: 'Unknown objectIdentifier',
            defaultTab: 'table',
        };
    }
}
