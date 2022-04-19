import { Checkbox, Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { Assignment, AssignmentCard } from './AssignmentsTab';
import { DotWithText } from './DotWithText';

interface AssignmentListProps {
    groupBySource: () => void;
    assignments: Assignment[];
    origins: string[];
}

export function AssignmentList({
    groupBySource,
    assignments,
    origins,
}: AssignmentListProps): JSX.Element {
    const [activeOrigins, setActiveOrigins] = useState<string[]>(origins);
    const isActive = (key: string) => activeOrigins.includes(key);

    const toggleActive = (appkey: string) =>
        setActiveOrigins((prev) =>
            prev.includes(appkey) ? prev.filter((x) => x !== appkey) : [...prev, appkey]
        );

    return (
        <>
            <Header>
                <div>
                    <ActiveOrigins>
                        {origins.map((originName) => (
                            <Chip
                                style={{
                                    backgroundColor: `${isActive(originName)
                                            ? tokens.colors.interactive.primary__selected_hover.hex
                                            : tokens.colors.ui.background__medium.hex
                                        }`,
                                }}
                                onClick={() => toggleActive(originName)}
                                key={originName}
                            >
                                <DotWithText text={getAssignmentCount(assignments, originName)} />
                                {originName}
                            </Chip>
                        ))}
                    </ActiveOrigins>
                </div>
                <IconMenu
                    iconName="filter_list"
                    items={[
                        {
                            label: 'Group by source',
                            icon: <Checkbox checked={false} />,
                            onClick: groupBySource,
                        },
                    ]}
                />
            </Header>
            <AssignmentsList>
                <BorderWrapper />
                {sortAndFilterAssignments(assignments, activeOrigins).map((assignment) => (
                    <BorderWrapper key={assignment.id}>
                        <AssignmentCard assignment={assignment} />
                    </BorderWrapper>
                ))}
            </AssignmentsList>
        </>
    );
}

export function getAssignmentCount(assignments: Assignment[], originName: string): number {
    return assignments.filter(({ origin }) => origin === originName).length;
}

export function sortAndFilterAssignments(
    list: Assignment[],
    activeOrigins: string[]
): Assignment[] {
    return list
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .filter((x) => activeOrigins.includes(x.origin));
}

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const AssignmentsList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const BorderWrapper = styled.div`
    border-bottom: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;

const ActiveOrigins = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 0em 1em;
`;
