/* eslint-disable no-console */
import { useAtom } from '@dbeining/react-atom';
import { useMemo } from 'react';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useWorkspaceKey';
import { getWorkSpaceContext, WorkSpaceConfig } from './workspaceState';

export function useWorkSpace<T>(): WorkSpaceConfig<T> {
    const key = useWorkSpaceKey();
    const state = useAtom(getWorkSpaceContext());
    const currentView = useMemo(() => state[key], [key, state]);

    if (currentView) {
        return currentView as WorkSpaceConfig<T>;
    } else {
        console.warn(`No workspace registered on path/key:  ${key}`);
        return {
            name: `Unknown Workspace ${key}`,
            objectIdentifier: 'Unknown objectIdentifier',
            defaultTab: 'table',
        };
    }
}
