import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

export function statusBarData(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Open requests',
            value: () => data.length.toString(),
            status: 'default',
        },
    ];
}
