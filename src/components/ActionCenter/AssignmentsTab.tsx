import { Chip, Checkbox, CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useMemo, useState } from 'react';

import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { AssignmentCard } from '../../Core/Assignments/Components/AssignmentsCard';
import { ActiveOrigins, Assignments, Header, Transition } from './assignmentsTab.styles';
import { useAssignments } from '../../Core/Assignments/Hooks/useAssignments';
import { getCountForAppName } from './Utils/getCount';
import { GroupedAssignments } from './GroupedAssignments';

export function AssignmentsTab(): JSX.Element {
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    const { assignments, error, isLoading } = useAssignments();

    const origins = useMemo(
        () =>
            assignments
                ? assignments
                    .map(({ sourceSystem }) => sourceSystem.subSystem)
                    .filter((v, i, a) => v && a.indexOf(v) === i)
                : [],
        [assignments]
    );

    const [isGroupedBySource, setIsGroupedBySource] = useState(false);

    const handleClick = (sourceSystem: string) =>
        setActiveAssignments((prev) =>
            prev.includes(sourceSystem)
                ? prev.filter((x) => x !== sourceSystem)
                : [...prev, sourceSystem]
        );

    const isActive = (key: string) => activeAssignments.includes(key);

    const [activeAssignments, setActiveAssignments] = useState<string[]>(origins ?? []);

    useEffect(() => {
        setActiveAssignments(origins);
    }, [assignments]);

    if (error) {
        return (
            <Transition>
                <div>Failed to load assignments</div>
            </Transition>
        );
    }

    if (isLoading) {
        return (
            <Transition>
                <CircularProgress size={48} />
            </Transition>
        );
    }

    return (
        <>
            <Assignments>
                <Header>
                    <ActiveOrigins>
                        {origins.map((applicationName) => (
                            <Chip
                                style={{
                                    backgroundColor: `${isActive(applicationName)
                                            ? tokens.colors.interactive.primary__selected_hover.hex
                                            : tokens.colors.ui.background__medium.hex
                                        }`,
                                }}
                                onClick={() => handleClick(applicationName)}
                                key={applicationName}
                            >
                                <div>{`${getCountForAppName(
                                    applicationName,
                                    assignments
                                )} ${capitalize(applicationName)}`}</div>
                            </Chip>
                        ))}
                    </ActiveOrigins>

                    <IconMenu
                        iconName="filter_list"
                        items={[
                            {
                                label: `${isGroupedBySource ? 'Ungroup' : 'Group by source'} `,
                                icon: <Checkbox checked={isGroupedBySource} readOnly />,
                                onClick: () => setIsGroupedBySource((prev) => !prev),
                            },
                        ]}
                    />
                </Header>
                {isGroupedBySource ? (
                    <GroupedAssignments
                        assignments={assignments}
                        activeAssignments={activeAssignments}
                    />
                ) : (
                    <>
                        {assignments &&
                            assignments
                                .filter(({ sourceSystem }) =>
                                    activeAssignments.includes(sourceSystem.subSystem)
                                )
                                .map((assignment) => (
                                    <AssignmentCard key={assignment.id} assignment={assignment} />
                                ))}
                    </>
                )}
            </Assignments>
        </>
    );
}
