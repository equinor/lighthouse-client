import { EventHub } from '@equinor/Utils';
import { useEffect } from 'react';
import { CustomEventActions, deleteBookmark } from '..';
import { ApplyEventArgs, SaveEventArgs } from '../types';
/**
 * Hook for registering events on Event Hub.
 * @param saveFn Function that is to be called when wanting to capture and save a bookmark
 * @param applyFn Function that is to be called when wanting to get a specific bookmark and apply it
 */
export const useBookmarkEvents = (
    saveFn: (args: SaveEventArgs) => void,
    applyFn: (args: ApplyEventArgs) => void
) => {
    const ev = new EventHub();

    useEffect(() => {
        const evt = ev.registerListener(CustomEventActions.SAVE, saveFn);
        return () => {
            evt();
        };
    }, [saveFn]);

    useEffect(() => {
        const evt = ev.registerListener(CustomEventActions.APPLY, applyFn);

        return () => {
            evt();
        };
    }, [applyFn]);
};
