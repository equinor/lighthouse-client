import { StatusItem } from '../../../../packages/StatusBar';
import { HandoverPackage } from '../models';
import { getStatusBarData } from '../utility/getStatusBarData';

export const statusBarData = (data: HandoverPackage[]): StatusItem[] => {
    const statusData = getStatusBarData(data);
    return [
        {
            title: 'Total CP',
            value: () => {
                return data.length.toString();
            },
        },
        {
            title: 'RFO Accepted',
            value: () => {
                return statusData['RFOC Accepted'].toString();
            },
        },
        {
            title: 'RFO Sent',
            value: () => {
                return statusData['RFOC Sent'].toString();
            },
        },
        {
            title: 'RFO Partly',
            value: () => {
                return statusData['RFOC Partly'].toString();
            },
        },
        {
            title: 'RFO OS',
            value: () => {
                return statusData.OS.toString();
            },
        },

        {
            title: 'RFO vs target',
            value: () => {
                return (
                    statusData['RFOC Accepted'] +
                    statusData['RFOC Sent'] -
                    statusData.targetSum
                ).toString();
            },
        },
        {
            title: 'RFO overdue',
            value: () => {
                return statusData.overdue.toString();
            },
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
