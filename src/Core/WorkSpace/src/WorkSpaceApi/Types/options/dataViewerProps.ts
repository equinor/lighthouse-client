import { ViewOptions } from './viewOptions';

export type DataViewerProps<T extends Record<PropertyKey, unknown>> = ViewOptions<T> & {
    data: T;
};
