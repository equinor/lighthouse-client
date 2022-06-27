import { StatusItem } from '@equinor/lighthouse-status-bar';
import { Loop } from '../../types';

type Kpi = {
    uniqueLoopTags: number;
    uniqueChecklists: number;
    checklistsSigned: number;
    checklistsNotSigned: number;
    ready: number;
    overdueChecklists: number;
    complete: number;
};
type PartialKpi = Pick<
    Kpi,
    'ready' | 'overdueChecklists' | 'checklistsSigned' | 'checklistsNotSigned'
>;
const getKpis = (loops: Loop[]): Kpi => {
    const uniqueLoops = new Set();
    const counts = loops.reduce(
        (acc, curr) => {
            uniqueLoops.add(curr.loopNo);
            if (curr.signedDate) {
                acc.checklistsSigned += 1;
            } else {
                acc.checklistsNotSigned += 1;
            }
            if (curr.isOverdue) {
                acc.overdueChecklists += 1;
            }

            if (
                (curr.loopContentStatus === 'PB' ||
                    curr.loopContentStatus === 'OK' ||
                    !curr.loopContentStatus) &&
                !curr.signedDate
            ) {
                acc.ready += 1;
            }

            return acc;
        },
        {
            checklistsSigned: 0,
            checklistsNotSigned: 0,
            ready: 0,
            overdueChecklists: 0,
        } as PartialKpi
    );

    return {
        ...counts,
        uniqueChecklists: loops.length,
        uniqueLoopTags: uniqueLoops.size,
        complete: Number(((counts.checklistsSigned / loops.length) * 100).toFixed(2)),
    };
};
function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}
export const statusBarConfig = (data: Loop[]): StatusItem[] => {
    const kpis = getKpis(data);

    return [
        {
            title: 'Loop tags',
            value: () => numberFormat(kpis.uniqueLoopTags),
        },
        {
            title: 'Checklists',
            value: () => numberFormat(kpis.uniqueChecklists),
        },
        {
            title: 'Checklist signed',
            value: () => numberFormat(kpis.checklistsSigned),
        },
        {
            title: 'Checklist not signed',
            value: () => numberFormat(kpis.checklistsNotSigned),
        },
        {
            title: 'Ready',
            value: () => numberFormat(kpis.ready),
        },
        {
            title: 'Overdue checklists',
            value: () => numberFormat(kpis.overdueChecklists),
        },
        {
            title: '% complete',
            value: () => `${kpis.complete}%`,
        },
    ];
};
