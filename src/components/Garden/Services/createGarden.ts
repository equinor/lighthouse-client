import { Data } from '../Models/data';

export type Garden<T> = Record<string, T[]>;

export function createGarden<T>(dataSet: T[], groupKey: keyof T, groupingKeys?: (keyof T)[]): Data<T> {
    let groupedData: Data<T>

    let allGroupingKeys = [groupKey];
    if (groupingKeys) {
        allGroupingKeys = [...allGroupingKeys, ...groupingKeys];
    }
    groupedData = groupBy(dataSet, allGroupingKeys);
    return groupedData;
}

function groupBy<T, K extends keyof T>(arr: T[], keys: K[], renderFunction?: CustomRender<T>): Data<T> {

    const key = keys[0] && keys[0].toString() || undefined
    if (!key) return {} as Data<T>;

    const data = arr.reduce((acc, item) => {
        const itemKeys: [] = Array.isArray(item[key]) ? item[key] : [item[key]];

        itemKeys.forEach((valueKey: string) => {

            acc[valueKey] = acc[valueKey] || {
                groupKey: key,
                value: valueKey,
                subGroups: {},
                items: [],
                count: 0,
                isExpanded: false,
                renderFunction: renderFunction && renderFunction[key]
            };
            acc[valueKey].items.push(item)
            acc[valueKey].count = acc[valueKey].count + 1
        });
        return acc

    }, {} as Data<T>);

    if (keys.length === 0) return data;

    const nextKeys = keys.slice(1)
    Object.keys(data).forEach(key => {
        data[key].subGroups = groupBy(data[key].items, nextKeys);
        if (nextKeys.length > 0)
            data[key].items = [];
    });

    return data

}

type RenderFunction<T> = (data: Data<T>) => React.FC<{ data: Data<T> }>

type CustomRender<T,> = {
    [key in keyof T]: RenderFunction<T>;
};

