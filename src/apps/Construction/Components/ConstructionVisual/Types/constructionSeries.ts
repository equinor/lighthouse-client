import { WorkOrder } from '../../../Types/workOrder';

export type Series = {
    label: string;
    data: number[];
    type: string;
    yAxisID?: string;
    backgroundColor?: string | string[];
    borderColor?: string;
};

export type CreateSeriesArgs = {
    data: WorkOrder[];
    categories: string[];
    options: {
        accumulated?: boolean;
        dateLimit?: Date;
        lastWoStatus?: string;
    };
};
