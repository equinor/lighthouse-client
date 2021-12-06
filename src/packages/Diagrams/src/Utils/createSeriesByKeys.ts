interface SeriesData {
    name: string;
    type: string;
    data: number[];
}

type BarLineData = [SeriesData[], string[]];

/**
 * createSeriesByKeys creat's a series and categories form a data set for
 * basic Bar and Line Chart.
 */
export function createSeriesByKeys<T>(
    dataItem: T[],
    type: string,
    nameKey: string,
    categoryKey: string
): BarLineData {
    const categories = dataItem.reduce((acc, item) => {
        acc = acc || [];
        const index = acc.findIndex((i) => i === item[categoryKey]);
        if (index === -1) {
            acc.push(item[categoryKey]);
        }
        return acc;
    }, [] as string[]);

    const names = dataItem.reduce((acc, item) => {
        acc = acc || [];
        const index = acc.findIndex((i) => i === item[nameKey]);
        if (index === -1) {
            acc.push(item[nameKey]);
        }
        return acc;
    }, [] as string[]);

    const result = names.map((name) => {
        const data: number[] = [];
        categories.forEach((k) => {
            data.push(dataItem.filter((i) => i[categoryKey] === k && i[nameKey] === name).length);
        });
        return { name, type, data };
    });

    return [result, categories];
}
