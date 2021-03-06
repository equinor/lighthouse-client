import { weekDiff } from '../../../Utils';
import { WoMapCount, WoStatusMap } from '../types';

export const createWoStatusMap = <T extends Record<string, any>>(
    data: T[],
    groupByKey: keyof T
): WoStatusMap<T> => {
    const woDiscMap = {} as WoStatusMap<T>;

    // I want all WOs that have one of these statuses
    const statusChecks = ['W01', 'W02', 'W03'];

    data.forEach((wo) => {
        if (statusChecks.includes(wo.jobStatus)) {
            const spread = woDiscMap[wo[groupByKey]] !== undefined;
            woDiscMap[wo[groupByKey]] = [
                ...(spread ? woDiscMap[wo[groupByKey]] : []),
                {
                    plannedStartUpDate: wo.plannedStartupDate,
                    status: wo.jobStatus,
                    workorder: wo,
                },
            ];
        }
    });
    return woDiscMap;
};

//TODO: improve this function...
export function filterWoMap<T>(woMap: WoStatusMap<T>): WoMapCount<T> {
    const keys = Object.keys(woMap);
    const filtered = {} as WoMapCount<T>;
    keys.forEach((key) => {
        woMap[key].forEach((a) => {
            filtered[key] = filtered[key] || {
                one: {
                    count: 0,
                    workorder: [],
                },
                two: {
                    count: 0,
                    workorder: [],
                },
                three: {
                    count: 0,
                    workorder: [],
                },
                four: {
                    count: 0,
                    workorder: [],
                },
                five: {
                    count: 0,
                    workorder: [],
                },
                six: {
                    count: 0,
                    workorder: [],
                },
            };
            const plannedDateDiff = weekDiff(new Date(a.plannedStartUpDate)).days;

            if (plannedDateDiff <= 7) {
                filtered[key].one.count = filtered[key].one.count + 1;
                filtered[key].one.workorder = [...filtered[key].one.workorder, a.workorder];
            } else if (plannedDateDiff <= 14) {
                filtered[key].two.count = filtered[key].two.count + 1;
                filtered[key].two.workorder = [...filtered[key].two.workorder, a.workorder];
            } else if (plannedDateDiff <= 21) {
                filtered[key].three.count = filtered[key].three.count + 1;
                filtered[key].three.workorder = [...filtered[key].three.workorder, a.workorder];
            } else if (plannedDateDiff <= 28) {
                filtered[key].four.count = filtered[key].four.count + 1;
                filtered[key].four.workorder = [...filtered[key].four.workorder, a.workorder];
            } else if (plannedDateDiff <= 35) {
                filtered[key].five.count = filtered[key].five.count + 1;
                filtered[key].five.workorder = [...filtered[key].five.workorder, a.workorder];
            } else if (plannedDateDiff <= 42) {
                filtered[key].six.count = filtered[key].six.count + 1;
                filtered[key].six.workorder = [...filtered[key].six.workorder, a.workorder];
            }
        });
    });
    return filtered;
}
