import { DataSet } from '../../../Models/data';
type GardenItemWithDepth<T> = {
    item: T;
    itemDepth: number;
};
export type GardenItem<T extends unknown> = DataSet<T> | GardenItemWithDepth<T>;
