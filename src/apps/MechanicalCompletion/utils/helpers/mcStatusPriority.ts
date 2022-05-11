import { McStatus } from '../../types';

export const mcStatusPriority: Record<McStatus, number> = {
    OS: 1,
    PA: 2,
    PB: 3,
    OK: 4,
};
