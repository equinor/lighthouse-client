import { models } from 'powerbi-client';

export interface PowerBiFilterItem {
    type: string;
    value: string;
    slicerName: string;
    target: models.IFilterGeneralTarget | undefined;
}
