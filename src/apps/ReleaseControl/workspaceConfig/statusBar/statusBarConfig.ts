import { StatusItem } from '@equinor/lighthouse-status-bar';
import moment from 'moment';
import { ReleaseControl } from '../../types/releaseControl';

function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

export function statusBarConfig(data: ReleaseControl[]): StatusItem[] {
    return [
        {
            title: 'Total',
            value: () => {
                return numberFormat(data?.length);
            },
        },
        {
            title: 'Open',
            value: () => {
                return numberFormat(data?.filter((x) => !x.isVoided && x.state === 'Open')?.length);
            },
        },
        {
            title: 'Overdue',
            value: () => {
                return numberFormat(
                    data?.filter((x) => moment(x.plannedDueDate).isBefore(Date.now()))?.length
                );
            },
        },
        {
            title: '% closed',
            value: () => {
                return (
                    Number(
                        (100 * data?.filter((x) => x.state === 'Closed').length) / data?.length
                    )?.toFixed(2) + '%'
                );
            },
        },
    ];
}
