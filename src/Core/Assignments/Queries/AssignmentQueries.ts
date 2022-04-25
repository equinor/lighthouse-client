import { UseQueryOptions } from 'react-query';
import { getFusionAssignments } from '../API/getFusionAssignments';

export const assignmentsBaseKey = ['Assignments'];

type Options = Pick<
    UseQueryOptions,
    'staleTime' | 'cacheTime' | 'queryFn' | 'queryKey' | 'refetchInterval'
>;

export const assignmentQueries = {
    getFusionAssignments: (): Options => ({
        queryFn: getFusionAssignments,
        queryKey: [...assignmentsBaseKey, 'fusion'],
        cacheTime: 5000 * 60,
        refetchInterval: 5000 * 60,
    }),
};
