import { StatusItem } from '@equinor/lighthouse-status-bar';
import { Punch } from '../../types/punch';
function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

type Kpi = {
    totalPunch: number;
    openPB: number;
    openPA: number;
    openPunch: number;
    cleared: number;
};
type PartialKpi = Pick<Kpi, 'openPB' | 'openPA' | 'cleared'>;
const getKpis = (data: Punch[]): Kpi => {
    const counts = data.reduce(
        (acc, curr) => {
            if (curr.clearedAtDate) {
                acc.cleared += 1;
            } else {
                if (curr.category === 'PB') {
                    acc.openPB += 1;
                } else {
                    acc.openPA += 1;
                }
            }

            return acc;
        },
        { cleared: 0, openPA: 0, openPB: 0 } as PartialKpi
    );

    return {
        ...counts,
        openPunch: counts.openPA + counts.openPB,
        cleared: Number(((counts.cleared / data.length) * 100).toFixed(2)),
        totalPunch: data.length,
    };
};
export const statusBarConfig = (data: Punch[]): StatusItem[] => {
    const kpis = getKpis(data);
    return [
        {
            title: 'Total punch',
            value: () => numberFormat(kpis.totalPunch),
        },
        {
            title: 'Open PB',
            value: () => numberFormat(kpis.openPB),
        },
        {
            title: 'Open PA',
            value: () => numberFormat(kpis.openPA),
        },
        {
            title: 'Open punch',
            value: () => numberFormat(kpis.openPunch),
        },
        {
            title: 'Cleared',
            value: () => `${kpis.cleared}%`,
        },
    ];
};
