import { StatusItem } from '@equinor/lighthouse-status-bar';
export type StatusFunc<T extends Record<PropertyKey, unknown>> = (data: T[]) => StatusItem[];
