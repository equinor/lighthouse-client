import { EventHub } from '@equinor/lighthouse-utils';
import { CustomEventActions } from '.';
import { ApplyEventArgs, SaveEventArgs } from '../types';
export const bookmarkEvents = {
    applyBookmark: (args: ApplyEventArgs) => {
        const ev = new EventHub();
        ev.publish(CustomEventActions.APPLY, args);
    },
    saveBookmark: (args: SaveEventArgs) => {
        const ev = new EventHub();
        ev.publish(CustomEventActions.SAVE, args);
    },
};
