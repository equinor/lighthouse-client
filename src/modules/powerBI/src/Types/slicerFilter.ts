import { models } from 'powerbi-client';

export type SlicerFilter = models.ISlicerFilter & {
    values?: (string | number | boolean)[];
};
