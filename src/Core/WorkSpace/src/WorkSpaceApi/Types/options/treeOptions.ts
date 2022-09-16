import { CustomVirtualView, StatusView } from '@equinor/ParkView';
interface Options<T> {
    groupDescriptionFunc?: (data: T, groupingKey: string) => string;
}
//update TreeOptions;;
export type TreeOptions<T extends Record<PropertyKey, unknown>> = {
    objectIdentifier: keyof T;
    groupByKeys?: (keyof T)[];
    itemKey: keyof T;
    excludeKeys?: (keyof T)[];
    customViews?: CustomVirtualView<T>;
    options?: Options<T>;
    status?: StatusView<T>;
    onGroupeSelect?: (item: T) => string;
    onSelect?: (item: T) => string;
};
