import { StatusItem } from '../../../../packages/StatusBar';
import { HandoverPackage } from '../models';
//TODO: add more KPIs
export const statusBarData = (data: HandoverPackage[]): StatusItem[] => {
    return [
        {
            title: 'Total commpkgs',
            value: () => {
                return data.length.toString();
            },
        },
    ];
};
