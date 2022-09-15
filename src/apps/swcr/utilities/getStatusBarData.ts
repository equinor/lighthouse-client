import { StatusItem } from '../../../packages/StatusBar';
import { SwcrPackage } from '../models/SwcrPackage';
export const statusBarData = (data: SwcrPackage[]): StatusItem[] => {
    return [
        {
            title: 'Total SWCRs',
            value: () => {
                return data.length.toString();
            },
        },
        {
            title: 'Open',
            value: () => {
                return data
                    .filter(
                        (swcr) => swcr.status !== 'Closed' && swcr.status !== 'Closed - Rejected'
                    )
                    .length.toString();
            },
        },
        {
            title: 'Closed',
            value: () => {
                return data
                    .filter(
                        (swcr) => swcr.status === 'Closed' || swcr.status === 'Closed - Rejected'
                    )
                    .length.toString();
            },
        },
        {
            title: '% Closed',
            value: () => {
                const total = data.length;
                const totalClosed = data.filter(
                    (swcr) => swcr.status === 'Closed' || swcr.status === 'Closed - Rejected'
                ).length;
                const percentageClosed = (totalClosed / total) * 100;
                return percentageClosed.toFixed(1);
            },
        },
    ];
};
