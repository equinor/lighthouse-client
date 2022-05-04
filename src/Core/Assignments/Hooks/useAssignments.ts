import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { assignmentQueries } from '../Queries/AssignmentQueries';
import { Assignment } from '../Types/assignment';

interface Assignments {
    proCoSysError: unknown;
    fusionError: unknown;
    isLoading: boolean;
    assignments: Assignment[];
}

export function useAssignments(): Assignments {
    const { getFusionAssignments, getProCoSysAssignments } = assignmentQueries;

    const { data, error, isLoading } = useQuery<unknown, unknown, Assignment[]>(
        getFusionAssignments()
    );

    const {
        data: procosysTasks,
        isLoading: procosysLoading,
        error: proCoSysError,
    } = useQuery<unknown, unknown, Assignment[]>(getProCoSysAssignments());

    const assignments = useMemo(
        () =>
            [...(data ?? []), ...(procosysTasks ?? [])]
                .filter(({ state }) => state === 'Active')
                .sort((a, b) => (a.created < b.created ? 1 : a.created > b.created ? -1 : 0)),
        [procosysTasks, data]
    );

    return {
        assignments,
        fusionError: error,
        proCoSysError: proCoSysError,
        isLoading: isLoading || procosysLoading,
    };
}
