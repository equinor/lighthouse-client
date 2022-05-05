import { Assignment } from '../../../Core/Assignments/Types/assignment';

export const getCountForAppName = (x: string, assignments: Assignment[]) =>
    assignments &&
    assignments.reduce(
        (acc, { sourceSystem }) => (sourceSystem.subSystem === x ? acc + 1 : acc),
        0
    );
