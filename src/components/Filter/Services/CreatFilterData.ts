import { FilterData, FilterDataOptions } from '../Types/FilterItem';

const getObjectValue = <T>(item: T, key: string): string => item[key];

/**
 * Creates a object representing the det tilter data based on the objects own properties.
 */
export function createFilterData<T>(
    dataArray: T[],
    options?: FilterDataOptions<T>
): FilterData {
    if (dataArray.length === 0) return {};
    return dataArray.reduce((filterData, dataItem) => {
        Object.keys(dataItem).forEach((typeKey: string) => {
            if (options?.excludeKeys?.includes(typeKey as keyof T))
                return filterData;

            if (options?.typeMap) {
                typeKey = options.typeMap[typeKey];
            }

            const filterObject =
                filterData[typeKey] ||
                (filterData[typeKey] = { value: {}, all: true, type: typeKey });

            let valueKey: string = getObjectValue(dataItem, typeKey);

            if (options?.groupeValue) {
                valueKey = options.groupeValue[typeKey](dataItem);
            }

            filterObject.value[valueKey] = {
                value: valueKey,
                checked: true,
                type: typeKey
            };
        });
        return filterData;
    }, {} as FilterData);
}

export function arrayFilterDict<T>(
    arr: T[],
    exclude?: string[],
    filterDict?: FilterData
): FilterData {
    if (arr.length === 0) return {};
    const newFilterDict = arr.reduce((a, i) => {
        Object.keys(i).map((typeKey: string) => {
            if (exclude && exclude.includes(typeKey)) return;
            if (filterDict && !filterDict[typeKey]) return;
            const value: string = i[typeKey];
            const obj =
                a[typeKey] ||
                (a[typeKey] = filterDict
                    ? filterDict[typeKey]
                    : { value: {}, all: true, type: typeKey });

            if (!obj.value[value]) {
                obj.value[value] = {
                    ...obj.value[value],
                    value,
                    checked: true,
                    type: typeKey
                };
            } else {
                obj.value[value] = { ...obj.value[value], value };
            }
        });
        return a;
    }, {} as FilterData);
    return newFilterDict;
}
