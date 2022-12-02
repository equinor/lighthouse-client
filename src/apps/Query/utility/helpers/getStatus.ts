import { QueryStatus } from '../../types';

export const QueryStatusPriority: Record<QueryStatus, number> = {
    Open: 0,
    Closed: 1,
};

export const getQueryStatusPriority = (status: QueryStatus): number => QueryStatusPriority[status];
