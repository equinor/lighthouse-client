import { Status } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { StatusView } from '../Context/ParkViewContext';
import { Data } from '../Models/data';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';

export function groupBy<T, K extends keyof T>(
    arr: T[],
    keys: K[],
    status?: StatusView<T>,
    groupDescriptionFunc?: GroupDescriptionFunc<T>
): Data<T> {
    const key = (keys[0] && keys[0].toString()) || undefined;
    if (!key) return {} as Data<T>;

    const data = arr.reduce((acc, item) => {
        const itemKeys: [] = Array.isArray(item[key]) ? item[key] : [item[key]];

        itemKeys.forEach((valueKey: string) => {
            acc[valueKey] = acc[valueKey] || {
                groupKey: key,
                value: valueKey,
                description: groupDescriptionFunc ? groupDescriptionFunc(item, key) : undefined,
                subGroups: {},
                items: [],
                count: 0,
                isExpanded: false,
            };
            acc[valueKey].items.push(item);
            acc[valueKey].count = acc[valueKey].count + 1;
        });
        return acc;
    }, {} as Data<T>);

    if (keys.length === 0) return data;

    const nextKeys = keys.slice(1);
    Object.keys(data).forEach((key) => {
        {
            if (status) {
                if (status.statusGroupFunc) {
                    data[key].status = status.statusGroupFunc(data[key]);
                } else if (status.shouldAggregate) {
                    let worstStatus: Status = status.statusItemFunc(data[key].items[0]);

                    data[key].items.map((x) => {
                        const itemStatus = status.statusItemFunc(x);
                        if (itemStatus.rating < worstStatus.rating) {
                            worstStatus = itemStatus;
                        }
                    });
                    data[key].status = worstStatus;
                }
            }
        }

        data[key].subGroups = groupBy(data[key].items, nextKeys, status, groupDescriptionFunc);
        if (nextKeys.length > 0) data[key].items = [];
    });

    return data;
}
