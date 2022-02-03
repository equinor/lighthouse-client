import { ChartDataset } from 'chart.js';
import { WorkOrder } from '../../../Types';

export type Series = Partial<Omit<ChartDataset<'bar' | 'line'>, 'data'>> & {
    label: string;
    data: number[];
    yAxisID?: string;
    borderDash?: number[];
    pointBackgroundColor?: string;
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
