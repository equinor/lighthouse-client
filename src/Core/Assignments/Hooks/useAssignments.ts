import { useQuery } from 'react-query';
import { assignmentQueries } from '../Queries/AssignmentQueries';
import { Assignment } from '../Types/assignment';

interface Assignments {
    assignments: Assignment[];
    error: unknown;
    isLoading: boolean;
}

export function useAssignments(): Assignments {
    const { getFusionAssignments } = assignmentQueries;

    const { data, error, isLoading } = useQuery<unknown, unknown, Assignment[]>(
        getFusionAssignments()
    );

    return {
        assignments: data ?? [],
        error,
        isLoading,
    };
}
