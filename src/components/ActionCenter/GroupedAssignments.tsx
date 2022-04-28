import { Accordion } from '@equinor/eds-core-react';
import { AssignmentCard } from '../../Core/Assignments/Components/AssignmentsCard';
import { Assignment } from '../../Core/Assignments/Types/assignment';

interface GroupedAssignmentsProps {
    assignments: Assignment[];
    activeAssignments: string[];
}

export const GroupedAssignments = ({
    activeAssignments,
    assignments,
}: GroupedAssignmentsProps): JSX.Element => {
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <Accordion>
            {activeAssignments.map((applicationTitle) => (
                <Accordion.Item key={applicationTitle}>
                    <Accordion.Header chevronPosition="right">
                        {capitalize(applicationTitle)}
                    </Accordion.Header>
                    {assignments &&
                        assignments
                            .filter(
                                ({ sourceSystem }) => sourceSystem.subSystem === applicationTitle
                            )
                            .map((assignment) => (
                                <Accordion.Panel key={assignment.id}>
                                    <AssignmentCard assignment={assignment} />
                                </Accordion.Panel>
                            ))}
                </Accordion.Item>
            ))}
        </Accordion>
    );
};
