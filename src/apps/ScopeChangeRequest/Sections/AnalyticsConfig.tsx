import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    const sanitized = data.filter((x) => x.isVoided === false);

    return [
        {
            title: 'Requests',
            value: () => {
                return sanitized.length.toString();
            },
        },
        {
            title: 'Mhrs',
            value: () => {
                let total = 0;
                sanitized
                    .filter((x) => x.guesstimateHours)
                    .forEach((x) => (total += x.guesstimateHours));
                return total.toString();
            },
        },
        {
            title: 'Pending requests',
            value: () => sanitized.filter((x) => x.state === 'Open').length.toString(),
        },
        {
            title: 'Pending mhrs',
            value: () => {
                let total = 0;
                sanitized
                    .filter((x) => x.state === 'Open')
                    .forEach((x) => (total += x.guesstimateHours));
                return total.toString();
            },
        },
        {
            title: 'Approved requests',
            value: () => sanitized.filter((x) => x.state === 'Closed').length.toString(),
        },

        {
            title: 'Approved Mhrs',
            value: () => {
                let total = 0;
                sanitized
                    .filter((x) => x.state === 'Closed')
                    .forEach((x) => (total += x.guesstimateHours));
                return total.toString();
            },
        },
    ];
}
