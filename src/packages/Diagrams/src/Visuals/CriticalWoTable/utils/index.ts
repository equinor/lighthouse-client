import { DateTime } from 'luxon';
import { WoMapCount, WoStatusMap } from '../types';

export const weekDiff = (week: Date) => {
    const now = DateTime.local();
    const woDate = DateTime.fromJSDate(week);
    const diff = woDate.diff(now, 'days');
    return diff;
};

export const createWoStatusMap = <T extends Record<string, any>>(
    data: T[],
    groupByKey: keyof T
) => {
    const woDiscMap = {} as WoStatusMap;

    // I want all WOs that have one of these statuses
    const statusChecks = ['W01', 'W02', 'W03'];

    data.forEach((wo) => {
        if (statusChecks.includes(wo.jobStatusCode)) {
            woDiscMap[wo[groupByKey]] = woDiscMap[wo[groupByKey]]
                ? [
                      ...woDiscMap[wo[groupByKey]],
                      {
                          plannedFinishDate: wo.plannedStartAtDate,
                          status: wo.jobStatusCode,
                      },
                  ]
                : [
                      {
                          plannedFinishDate: wo.plannedStartAtDate,
                          status: wo.jobStatusCode,
                      },
                  ];
        }
    });
    return woDiscMap;
};
export const filterWoMap = (woMap: WoStatusMap): WoMapCount => {
    const keys = Object.keys(woMap);
    const filtered = {} as WoMapCount;
    keys.forEach((key) => {
        woMap[key].forEach((a) => {
            filtered[key] = filtered[key] || {
                one: 0,
                two: 0,
                three: 0,
                four: 0,
            };
            const plannedDateDiff = weekDiff(new Date(a.plannedFinishDate)).days;
            if (0 < plannedDateDiff && plannedDateDiff <= 7) {
                filtered[key].one = filtered[key].one + 1;
            } else if (0 < plannedDateDiff && plannedDateDiff <= 14) {
                filtered[key].two = filtered[key].two + 1;
            } else if (0 < plannedDateDiff && plannedDateDiff <= 21) {
                filtered[key].three = filtered[key].three + 1;
            } else if (0 < plannedDateDiff && plannedDateDiff <= 28) {
                filtered[key].four = filtered[key].four + 1;
            }
        });
    });
    return filtered;
};
