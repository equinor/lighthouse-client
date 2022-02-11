import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Pending requests',
            value: () => data.filter((x) => x.state === 'Open').length.toString(),
            status: 'default',
        },
        {
            title: 'Pending mhrs',
            value: () => {
                let total = 0;
                data.filter((x) => x.state === 'Open').forEach(
                    (x) => (total += x.guesstimateHours)
                );
                return total.toString();
            },
            status: 'default',
        },
        {
            title: 'Requests',
            value: () => {
                return data.length.toString();
            },
            status: 'default',
        },
    ];
}
