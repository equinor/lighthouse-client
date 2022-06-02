import { StatusItem } from '@equinor/lighthouse-status-bar';
import { HandoverPackage } from '../../Garden/models';
import { getStatusBarData } from '../helpers/getStatusBarData';
function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}
export const statusBarConfig = (data: HandoverPackage[]): StatusItem[] => {
    const statusData = getStatusBarData(data);
    return [
        {
            title: 'Total CP',
            value: () => numberFormat(data.length),
        },
        {
            title: 'RFO Accepted',
            value: () => numberFormat(statusData['RFOC Accepted']),
        },
        {
            title: 'RFO Sent',
            value: () => numberFormat(statusData['RFOC Sent']),
        },
        {
            title: 'RFO Partly',
            value: () => {
                return statusData['RFOC Partly'].toString();
            },
        },
        {
            title: 'RFO OS',
            value: () => numberFormat(statusData.OS),
        },

        {
            title: 'RFO vs target',
            value: () =>
                numberFormat(
                    statusData['RFOC Accepted'] + statusData['RFOC Sent'] - statusData.targetSum
                ),
        },
        {
            title: 'RFO overdue',
            value: () => numberFormat(statusData.overdue),
        },
        {
            title: 'RFO %',
            value: () => {
                const rfoPercent = (
                    ((statusData['RFOC Accepted'] + statusData['RFOC Sent']) / data.length) *
                    100
                ).toFixed(1);

                return `${rfoPercent}%`;
            },
        },
    ];
};
