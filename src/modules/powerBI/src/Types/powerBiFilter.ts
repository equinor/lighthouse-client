import { VisualDescriptor } from 'powerbi-client';
import { PowerBiFilterItem } from './powerBiFilterItem';

export interface PowerBiFilter {
    type: string;
    slicer: VisualDescriptor;
    sortOrder: number;
    value: Record<string, PowerBiFilterItem>;
    filterVals: string[];
}
