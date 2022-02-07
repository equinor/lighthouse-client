import { TimeDimension } from '@equinor/Diagrams';

export interface ConstructionGraphProps<T> {
    data: T[];
    title?: string;
    defaultTime?: TimeDimension;
}
