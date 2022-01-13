export const createCreatedAtMap = <T extends Record<string, any>>(
    data: T[],
    accessorKey: keyof T
) => {
    const createdAtMap = {} as Record<string, number>;

    data.forEach((item) => {
        createdAtMap[item[accessorKey]] = createdAtMap[item[accessorKey]] + 1 || 1;
    });

    return createdAtMap;
};

export const sortMapByDate = (obj: Record<string, number>) => {
    const ordered = Object.keys(obj).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const remap = ordered.reduce((acc, curr) => {
        acc[curr] = obj[curr];
        return acc;
    }, {} as Record<string, number>);

    return remap;
};

export const accumulateArray = (arr: number[], init: number) => {
    console.log(init);
    for (let i = 1; i < arr.length; i++) {
        console.log('first item', arr[0]);
        arr[i] = (arr[i - 1] || 0) + arr[i];
        if (i === 1) {
            arr[i] = arr[i - 1] + init;
            console.log('hmm', arr[i]);
        }
    }
    return arr;
};
export const sumArray = (obj: Record<string, number>, dateLimit: Date) => {
    const filtered = filterByDate(obj, dateLimit, 'old');
    console.log('old filtered', filtered);
    const sum = Object.values(filtered).reduce((acc, curr) => acc + curr, 0);
    return sum;
};

export const filterByDate = (
    obj: Record<string, number>,
    dateLimit: Date,
    temp: 'old' | 'new' = 'new'
) => {
    const dateKeys = Object.keys(obj);
    const filteredDates = dateKeys.filter((date) =>
        temp === 'new'
            ? dateLimit.getTime() < new Date(date).getTime()
            : dateLimit.getTime() > new Date(date).getTime()
    );

    const filteredMap = filteredDates.reduce((acc, curr) => {
        acc[curr] = obj[curr];
        return acc;
    }, {} as Record<string, number>);
    return filteredMap;
};

type Accumulated = {
    series: {
        name: string;
        data: number[];
    }[];
    categories: string[];
};
export const createAccumulativeSeries = <T extends Record<string, any>>(
    data: T[],
    accessorKey: keyof T,
    dateLimit: Date
): Accumulated => {
    const initialMap = createCreatedAtMap(data, accessorKey);
    const orderedInitialMap = sortMapByDate(initialMap);
    const sumBeforeFilter = sumArray(orderedInitialMap, dateLimit);
    const filteredMap = filterByDate(orderedInitialMap, dateLimit);
    const cumulativeSum = (
        (sum: number) => (value: number) =>
            (sum += value)
    )(sumBeforeFilter);
    const accumulated = Object.values(filteredMap).map(cumulativeSum);
    const categoriesSet = new Set<string>();
    Object.keys(filteredMap).forEach((cat) => categoriesSet.add(cat));

    return { series: [{ name: 'Accumulated', data: accumulated }], categories: [...categoriesSet] };
};
