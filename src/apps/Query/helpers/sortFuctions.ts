import { Query, QuerySignature } from '../model';
import { getQueryStatusPriority } from './getStatus';

export const sortQueryByStatus = (columnA: Query, columnB: Query): number =>
    getQueryStatusPriority(columnA.queryStatus) - getQueryStatusPriority(columnB.queryStatus) ||
    parseInt(columnA.queryNo) - parseInt(columnB.queryNo);

export const sortBySequence = (columnA: QuerySignature, columnB: QuerySignature): number =>
    parseInt(columnA.sequence) - parseInt(columnB.sequence);
