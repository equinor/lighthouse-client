import { Checkbox } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { AssignmentGroups } from './AssignmentGroup';
import { Assignment } from './AssignmentsTab';

interface GroupedAssignmentsProps {
    origins: string[];
    assignments: Assignment[];
    ungroup: () => void;
}

export function GroupedAssignments({
    assignments,
    origins,
    ungroup,
}: GroupedAssignmentsProps): JSX.Element {
    return (
        <>
            <Header>
                <IconMenu
                    iconName="filter_list"
                    items={[
                        {
                            label: `Ungroup`,
                            icon: <Checkbox checked={true} />,
                            onClick: ungroup,
                        },
                    ]}
                />
            </Header>

            <AssignmentGroups origins={origins} assignments={assignments} />
        </>
    );
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`;
