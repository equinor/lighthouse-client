import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Req. pending approval',
            value: () => data.filter((x) => x.state === 'Open').length.toString(),
            status: 'default',
        },
        {
            title: 'Mhrs pending approval',
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
            title: 'Total requests',
            value: () => {
                return data.length.toString();
            },
            status: 'default',
        },
    ];
}
