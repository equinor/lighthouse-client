import { interpolateBlues } from 'd3-scale-chromatic';
import { DateTime } from 'luxon';
import { WorkOrder } from '../../../../apps/Construction/mocData/mockData';
import { interpolateColors } from './colorGenerator';
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
export const renameCategories = (categories: string[]): string[] => {
    const renamed = [] as string[];
    categories.forEach((category) => {
        const date = DateTime.fromJSDate(new Date(category));
        renamed.push(`${date.year}w${date.weekNumber}`);
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
    label: string;
    data: number[];
    type: string;
    yAxisID?: string;
    backgroundColor?: string | string[];
    borderColor?: string;
};

type CreateSeriesArgs = {
    data: WorkOrder[];
    categories: string[];
    options: {
        accumulated?: boolean;
        dateLimit?: Date;
        lastWoStatus?: string;
    };
};

export const createSeries = ({
    data,
    categories,
    options: { dateLimit = new Date('07/01/2021'), lastWoStatus = 'W04', accumulated = false },
}: CreateSeriesArgs): Series[] => {
    const categoriesMap = createCategoriesMap(categories);
    const seriesMap = {} as Record<
        string,
        {
            label: string;
            data: Record<string, number>;
        }
    >;

    data.forEach((item) => {
        item.jobStatusCutoffs.forEach((cutoff) => {
            seriesMap[cutoff.status] = seriesMap[cutoff.status] || {
                label: cutoff.status,
                data: { ...categoriesMap },
            };

            cutoff.weeks.forEach((week) => {
                seriesMap[cutoff.status].data[week] = seriesMap[cutoff.status].data[week] + 1;
            });
            //seems like we dont need to do this..
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
    const graphColors = interpolateColors(Object.keys(seriesMap).length + 1, interpolateBlues, {
        colorStart: 0.2,
        colorEnd: 1,
        useEndAsStart: false,
    });
    const woSeries = Object.values(seriesMap).map((series, index) => {
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
        const newSeries = {
            label: series.label,
            data: [],
            type: 'bar',
            backgroundColor: graphColors[index],
        } as Series;
        newSeries.data = Object.values(sortedSeries);

        return newSeries;
    });
    woSeries.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
    });
    const series = accumulateSeries(woSeries).concat(woSeries);
    return series;
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
                label: 'accumulated',
                type: 'line',
                backgroundColor: 'green',
            },
        ];
    }
    const totalAccumulated: number[] = series
        .map((entry) => entry.data)
        .reduce((acc, curr) => curr.map((entry, index) => (acc[index] || 0) + entry), []);
    //let temp: number = 0;
    //const tempAcc = totalAcc.map((item) => (temp = (temp || 0) + item));
    const ready = ['W04', 'W05', 'W06', 'W07', 'W08'];
    //TODO: breaks if no wo4 in array
    const wo4Accumulated: number[] = series
        .filter((entry) => ready.includes(entry.label))
        .map((entry) => entry.data)
        .reduce((acc, curr) => curr.map((entry, index) => (acc[index] || 0) + entry, []));

    //let temp2: number = 0;
    //const tempAcc2 = wo4Acc.map((item) => (temp2 = (temp2 || 0) + item));

    return [
        {
            data: totalAccumulated,
            label: 'accumulated',
            type: 'line',
            yAxisID: 'acc',
            backgroundColor: 'green',
            borderColor: 'green',
        },
        {
            data: wo4Accumulated,
            label: 'w04-w08 acc',
            type: 'line',
            borderColor: 'red',
            backgroundColor: 'red',
            yAxisID: 'acc',
        },
    ];
};
