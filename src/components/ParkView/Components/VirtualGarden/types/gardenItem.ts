import { DataSet } from '../../../Models/data';
export type GardenItemWithDepth<T> = {
    item: T;
    itemDepth: number;
};
export type GardenItem<T extends Record<PropertyKey, unknown>> =
    | DataSet<T>
    | GardenItemWithDepth<T>;
