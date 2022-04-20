import { Section } from '../Accordion/Section';
import { Assignment, AssignmentCard } from './AssignmentsTab';
import { DotWithText } from './DotWithText';

interface AssignmentGroupProps {
    origins: string[];
    assignments: Assignment[];
}

export function AssignmentGroups({ assignments, origins }: AssignmentGroupProps): JSX.Element {
    return (
        <>
            {origins.map((originName) => {
                const filteredAssignments = sortByDueDate(assignments).filter(
                    ({ origin }) => origin === originName
                );

                return (
                    <Section
                        headerIcon={<DotWithText text={filteredAssignments.length} />}
                        key={originName}
                        title={originName}
                    >
                        {filteredAssignments.map((assignment) => (
                            <AssignmentCard key={assignment.id} assignment={assignment} />
                        ))}
                    </Section>
                );
            })}
        </>
    );
}

function sortByDueDate(list: Assignment[]) {
    return list.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}
