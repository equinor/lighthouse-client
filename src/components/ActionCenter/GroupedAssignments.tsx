import { Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { AssignmentCard } from '../../Core/Assignments/Components/AssignmentsCard';
import { Assignment } from '../../Core/Assignments/Types/assignment';
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

    return (
        <Accordion>
            {activeAssignments.map((applicationTitle) => (
                <Accordion.Item key={applicationTitle}>
                    <Header chevronPosition="right">{capitalize(applicationTitle)}</Header>
                    {assignments &&
                        assignments
                            .filter(
                                ({ sourceSystem }) => sourceSystem.subSystem === applicationTitle
                            )
                            .map((assignment) => (
                                <Panel
                                    onClick={() =>
                                        handleActionClick(
                                            assignment.sourceSystem.subSystem,
                                            assignment.sourceSystem.identifier
                                        )
                                    }
                                    key={assignment.id}
                                >
                                    <AssignmentCard assignment={assignment} />
                                </Panel>
                            ))}
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

const Panel = styled(Accordion.Panel)`
    margin: 0;
    padding: 0;
    height: auto;
    border: none;
    min-height: auto;
`;

const Header = styled(Accordion.Header)`
    border: none;
    border-bottom: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
`;
