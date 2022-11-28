import { QueryStatus } from './query';

const queryStatusColors: Record<QueryStatus, string> = {
    Open: '#D9EAF2',
    Closed: '#0D59F2',
};

export const getQueryStatusColor = (status: QueryStatus): string => queryStatusColors[status];
