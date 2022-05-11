import { EventHub } from '@equinor/lighthouse-utils';
import { useEffect } from 'react';
import { CustomEventActions } from '..';
import { ApplyEventArgs, SaveEventArgs } from '../types';
type BookmarkEventsArgs = {
    saveFn: (args: SaveEventArgs) => void;
    applyFn: (args: ApplyEventArgs) => void;
};
/**
 * Hook for registering events on Event Hub.
 * @param saveFn Function that is to be called when wanting to capture and save a bookmark
 * @param applyFn Function that is to be called when wanting to get a specific bookmark and apply it
 */
export const useBookmarkEvents = ({ saveFn, applyFn }: BookmarkEventsArgs) => {
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
