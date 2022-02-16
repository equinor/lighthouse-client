import { models, VisualDescriptor } from 'powerbi-client';

export type SlicerData = {
    data: string;
    filter: models.IFilter | undefined;
    slicer: VisualDescriptor;
};
