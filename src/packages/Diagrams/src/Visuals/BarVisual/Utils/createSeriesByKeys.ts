interface SeriesData {
    series: { name: string; type: string; data: number[] }[];
    categories: string[];
}

/**
 * Will creat a series and categories form a data set for configuring
 * Bar and Line Chart
 *
 */
export function createSeriesByKeys<T>(
    dataItem: T[],
    type: string,
    nameKey: string,
    categoryKey: string
): SeriesData {
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

    const series = names.map((name) => {
        const data: number[] = [];
        categories.forEach((k) => {
            data.push(dataItem.filter((i) => i[categoryKey] === k && i[nameKey] === name).length);
        });
        return { name, type, data };
    });

    return { series, categories };
}
