import { StatusItem } from '@equinor/lighthouse-status-bar';
import moment from 'moment';
import { ReleaseControl } from '../../types/releaseControl';

export function statusBarConfig(data: ReleaseControl[]): StatusItem[] {
    return [
        {
            title: 'Total',
            value: () => {
                return data?.length?.toString();
            },
        },
        {
            title: 'Open',
            value: () => {
                return data?.filter((x) => !x.isVoided && x.state === 'Open')?.length?.toString();
            },
        },
        {
            title: 'Overdue',
            value: () => {
                return data
                    ?.filter((x) => moment(x.plannedDueDate).isBefore(Date.now()))
                    ?.length?.toString();
            },
        },
        {
            title: '% closed',
            value: () => {
                return (
                    ((100 * data?.filter((x) => x.state === 'Closed').length) / data?.length)
                        ?.toFixed(2)
                        ?.toString() + '%'
                );
            },
        },
    ];
}
