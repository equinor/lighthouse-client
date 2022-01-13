import { DateTime } from 'luxon';
import { WorkOrder } from '../../../../apps/Construction/mocData/mockData';
/**
 * Creates a set of unique dates
 * Which can be used as categories for Apexcharts
 * If you want to limit the categories to a specific date, pass dateLimit as second argument
 */
export const createUniqueCategories = (
    data: WorkOrder[],
    dateLimit = new Date('07/01/2021')
): string[] => {
    const categories = new Set<string>();
    data.forEach((element) => {
        element.jobStatusCutoffs.forEach((cutoff) => {
            cutoff.weeks.forEach((week) => {
                // Only want to add the dates that are after datelimit
                dateLimit.getTime() < new Date(week).getTime() && categories.add(week);
            });
        });
    });
    return [...categories];
};

/**
 * Sort an array of strings (dates)
 */
export const sortCategories = (categories: string[]): string[] => {
    const sorted = categories.sort((a: string, b: string) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });
    return sorted;
};
/**
 * Instead of displaying '07/25/2021' we change the date to
 * display the week number.
 * Using luxon to retrieve the week number.
 */
export const renameCats = (categories: string[]): string[] => {
    const renamed = [] as string[];
    categories.forEach((category) => {
        const date = DateTime.fromJSDate(new Date(category));
        renamed.push(`w${date.weekNumber}`);
    });
    return renamed;
};

/**
 * Creates a dictionary with categories as key and value will be 0
 * Can later be used to increment the value when counting how many WOs belong in this key.
 */
export const createCategoriesMap = (categories: string[]): Record<string, number> => {
    return categories.reduce((map, item) => {
        map[item] = 0;
        return map;
    }, {});
};

type Series = {
    name: string;
    data: number[];
};

type CreateSeriesArgs = {
    data: WorkOrder[];
    cats: string[];
    options: {
        accumulated?: boolean;
        dateLimit?: Date;
        lastWoStatus?: string;
    };
};

export const createSeries = ({
    data,
    cats,
    options: { dateLimit = new Date('07/01/2021'), lastWoStatus = 'W04', accumulated = false },
}: CreateSeriesArgs): Series[] => {
    const categories = createCategoriesMap(cats);
    const seriesMap = {} as Record<string, { name: string; data: Record<string, number> }>;

    data.forEach((item) => {
        item.jobStatusCutoffs.forEach((cutoff) => {
            seriesMap[cutoff.status] = seriesMap[cutoff.status] || {
                name: cutoff.status,
                data: { ...categories },
            };
            cutoff.weeks.forEach((week) => {
                seriesMap[cutoff.status].data[week] = seriesMap[cutoff.status].data[week] + 1;
            });

            // if (cutoff.status === lastWoStatus) {
            //     const data = Object.keys(seriesMap[cutoff.status].data);
            //     const lastDataItem = cutoff.weeks[cutoff.weeks.length - 1];
            //     const lastIndex = data.findIndex((x) => x === lastDataItem);
            //     const rest = data.splice(lastIndex, data.length);
            //     rest.forEach((week) => {
            //         seriesMap[cutoff.status].data[week] = seriesMap[cutoff.status].data[week] + 1;
            //     });
            // }
        });
    });

    const woSeries = Object.values(seriesMap).map((series) => {
        const dateKeys = Object.keys(series.data);
        // filter the dates that are too old, sort them
        const sortedDates = dateKeys
            .filter((date) => dateLimit.getTime() < new Date(date).getTime())
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        // make dictionary with the new, sorted dates
        const sortedSeries = sortedDates.reduce((acc, curr) => {
            acc[curr] = series.data[curr];
            return acc;
        }, {});
        const newSeries = { name: series.name, data: [] } as Series;
        newSeries.data = Object.values(sortedSeries);
        return newSeries;
    });

    return woSeries;
    // return accumulated ? accumulateSeries(woSeries) : woSeries;
};

/**
 * Categories:
 * [2019, 2020, 2021]
 *
 *
 * @param - Series: [[1,2,3], [3,2,1]]
 * @returns - Accumulated:  [4,8,12] for categories [2019, 2020, 2021]
 * or [4,4,4] for [2019, 2020, 2021]?
 */
export const accumulateSeries = (series: Series[]): Series[] => {
    if (!series || series.length === 0) {
        return [
            {
                data: [],
                name: 'accumulated',
            },
        ];
    }
    const totalAcc: number[] = series
        .map((entry) => entry.data)
        .reduce((prev, curr) => curr.map((entry, index) => (prev[index] || 0) + entry), []);
    let temp: number = 0;
    const tempAcc = totalAcc.map((item) => (temp = (temp || 0) + item));

    //TODO: breaks if no wo4 in array
    const wo4Acc: number[] = series
        .filter((entry) => entry.name === 'W04')
        .map((entry) => entry.data)
        .reduce((prev, curr) => curr.map((entry, index) => (prev[index] || 0) + entry, []));

    let temp2: number = 0;
    const tempAcc2 = wo4Acc.map((item) => (temp2 = (temp2 || 0) + item));

    return [
        { data: tempAcc, name: 'accumulated' },
        { data: tempAcc2, name: 'accumulated wo4' },
    ];
};

export const createAccumulatedSeries = (data: WorkOrder[], series: Series[]) => {};

export const tempAcc = (series: Series[]): number[] => {
    if (!series || series.length === 0) {
        return [];
    }
    return series
        .map((entry) => entry.data)
        .reduce((acc, curr) => curr.map((entry, index) => (acc[index] || 0) + entry));
};
/**
 * Temp for series that is not part of the filtered data set based on dates
 * to find accumulative and use it as init in the reduce func.
 */
// const woOldSeries = Object.values(seriesMap).map((series) => {
//     const dateKeys = Object.keys(series.data);

//     const temp = dateKeys
//         .filter((date) => checkDate.getTime() > new Date(date).getTime())
//         .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
//         .reduce((acc, curr) => {
//             acc[curr] = series.data[curr];
//             return acc;
//         }, {});
//     const newSeries = { name: series.name, data: [] } as Series;
//     newSeries.data = Object.values(temp);
//     return newSeries;
// });
