import { Accordion } from '@equinor/eds-core-react';
import { useNavigate } from 'react-router';
import { AssignmentCard } from '../../Core/Assignments/Components/AssignmentsCard';
import { Assignment } from '../../Core/Assignments/Types/assignment';
import { useLocationKey } from '../../packages/Filter/Hooks/useLocationKey';
import { handleActionClick } from './handleActionClick';

interface GroupedAssignmentsProps {
    assignments: Assignment[];
    activeAssignments: string[];
}

export const GroupedAssignments = ({
    activeAssignments,
    assignments,
}: GroupedAssignmentsProps): JSX.Element => {
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
    const navigate = useNavigate();
    const currentLocation = useLocationKey();

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
                                <Accordion.Panel
                                    onClick={() =>
                                        handleActionClick(
                                            assignment.sourceSystem.subSystem,
                                            assignment.sourceSystem.identifier,
                                            navigate,
                                            currentLocation
                                        )
                                    }
                                    key={assignment.id}
                                >
                                    <AssignmentCard assignment={assignment} />
                                </Accordion.Panel>
                            ))}
                </Accordion.Item>
            ))}
        </Accordion>
    );
};
