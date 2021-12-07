import { StidDocument } from './stidDocument';
import { Tag } from './tag';

export interface ScopeChangeRequest {
    id: string;
    title: string;
    description: string;
    created: string;
    state: 'Closed' | 'Open';
    phase: string;
    milestone: string;
    origin: string;
    category: string;
    guesstimateHrs: number;
    actualHrs: string;
    responsible: string;
    tags?: Tag[];
    documents?: StidDocument[];
    //workflow
}
