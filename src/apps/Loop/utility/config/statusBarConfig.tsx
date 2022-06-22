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

const getKpis = (loops: Loop[]): Kpi => {
    const uniqueLoops = new Set();
    const counts = loops.reduce(
        (acc, curr) => {
            uniqueLoops.add(curr.tagNo);
            if (curr.signedDate) {
                acc.checklistsSigned += 1;
            } else {
                acc.checklistsNotSigned += 1;
            }

            if (curr.loopContentStatus === ('PB' || 'OK' || null)) {
                acc.ready += 1;
            } else {
                acc.complete += 1;
            }

            return acc;
        },
        {
            uniqueLoopTags: 0,
            uniqueChecklists: 0,
            checklistsSigned: 0,
            checklistsNotSigned: 0,
            ready: 0,
            complete: 0,
            overdueChecklists: 0,
        } as Kpi
    );

    return {
        ...counts,
        uniqueChecklists: loops.length,
        uniqueLoopTags: uniqueLoops.size,
        complete: (counts.complete / counts.uniqueChecklists) * 100,
    };
};
export const statusBarConfig = (data: Loop[]): StatusItem[] => {
    const kpis = getKpis(data);

    return [
        {
            title: 'Loop tags',
            value: () => kpis.uniqueLoopTags.toString(),
        },
        {
            title: 'Checklists',
            value: () => kpis.uniqueChecklists.toString(),
        },
        {
            title: 'Checklist signed',
            value: () => kpis.checklistsSigned.toString(),
        },
        {
            title: 'Checklist not signed',
            value: () => kpis.checklistsNotSigned.toString(),
        },
        {
            title: 'Ready',
            value: () => kpis.ready.toString(),
        },
        {
            title: 'Overdue checklists',
            value: () => kpis.overdueChecklists.toString(),
        },
        {
            title: '% complete',
            value: () => `${kpis.complete}%`,
        },
    ];
};
