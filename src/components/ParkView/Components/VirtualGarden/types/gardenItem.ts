import { DataSet } from '../../../Models/data';

export type GardenItem<T extends unknown> = DataSet<T> | T;
