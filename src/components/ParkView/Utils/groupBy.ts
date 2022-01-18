import { FieldSettings } from '../../../apps/swcr/models/FieldSettings';
import { Status } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { StatusView } from '../Context/ParkViewContext';
import { Data } from '../Models/data';
import { GroupDescriptionFunc } from '../Models/groupDescriptionFunc';

export function groupBy<T, K extends keyof T>(
    arr: T[],
    keys: K[],
    status?: StatusView<T>,
    groupDescriptionFunc?: GroupDescriptionFunc<T>,
    fieldSettings?: FieldSettings<T, string>,
    isExpanded?: boolean
): Data<T> {
    const key = (keys[0] && keys[0].toString()) || undefined;
    if (!key) return {} as Data<T>;

    const fieldSetting = fieldSettings?.[key];

    const data = arr.reduce((acc, item) => {
        const itemKeys: string[] = fieldSetting?.getKey
            ? fieldSetting.getKey(item)
            : Array.isArray(item[key])
            ? item[key]
            : [item[key]];

        itemKeys.forEach((valueKey: string) => {
            if (!valueKey) valueKey = '(Blank)';
            acc[valueKey] = acc[valueKey] || {
                groupKey: key,
                value: valueKey,
                description: groupDescriptionFunc ? groupDescriptionFunc(item, key) : undefined,
                subGroups: {},
                items: [],
                count: 0,
                isExpanded: Boolean(isExpanded),
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

        data[key].subGroups = groupBy(
            data[key].items,
            nextKeys,
            status,
            groupDescriptionFunc,
            fieldSettings,
            true
        );
        if (nextKeys.length > 0) data[key].items = [];
    });

    return data;
}
