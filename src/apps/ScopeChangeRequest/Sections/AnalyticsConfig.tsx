import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Open requests',
            value: () => data.filter((x) => x.state === 'Open').length.toString(),
            status: 'default',
        },
        {
            title: 'Mhrs increase',
            value: () => {
                let total = 0;
                data.forEach((x) => (total += x.actualChangeHours));
                return total.toString();
            },
            status: 'default',
        },
    ];
}
