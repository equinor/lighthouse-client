import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { kFormatter } from '../Functions/kFormatter';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Requests',
            value: () => {
                return data.length.toString();
            },
        },
        {
            title: 'Mhrs',
            value: () => {
                let total = 0;
                data.filter((x) => x.guesstimateHours).forEach(
                    (x) => (total += x.guesstimateHours)
                );
                return kFormatter(total).toString();
            },
        },
        {
            title: 'Pending requests',
            value: () => data.filter((x) => x.state === 'Open').length.toString(),
        },
        {
            title: 'Pending mhrs',
            value: () => {
                let total = 0;
                data.filter((x) => x.state === 'Open').forEach(
                    (x) => (total += x.guesstimateHours)
                );

                return kFormatter(total).toString();
            },
        },
        {
            title: 'Approved requests',
            value: () => data.filter((x) => x.state === 'Closed').length.toString(),
        },

        {
            title: 'Approved Mhrs',
            value: () => {
                let total = 0;
                data.filter((x) => x.state === 'Closed').forEach(
                    (x) => (total += x.guesstimateHours)
                );

                return kFormatter(total).toString();
            },
        },
    ];
}
