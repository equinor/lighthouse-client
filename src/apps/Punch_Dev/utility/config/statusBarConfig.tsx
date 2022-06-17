import { StatusItem } from '@equinor/lighthouse-status-bar';
import { Punch } from '../../types/punch';

export const statusBarConfig = (data: Punch[]): StatusItem[] => {
    return [
        {
            title: 'Punches',
            value: () => data.length.toString(),
        },
    ];
};
