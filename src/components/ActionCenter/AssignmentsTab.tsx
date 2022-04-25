import { Chip, Checkbox, Accordion, CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';

import { IconMenu } from '../../apps/ScopeChangeRequest/Components/MenuButton';
import { AssignmentCard } from '../../Core/Assignments/Components/AssignmentsCard';
import { ActiveOrigins, Assignments, Header } from './assignmentsTab.styles';
import { useAssignments } from '../../Core/Assignments/Hooks/useAssignments';

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

    const [isGroupedBySource, setIsGroupedBySource] = useState(true);

    const handleClick = (sourceSystem: string) =>
        setActiveNotifications((prev) =>
            prev.includes(sourceSystem)
                ? prev.filter((x) => x !== sourceSystem)
                : [...prev, sourceSystem]
        );

    const isActive = (key: string) => activeNotifications.includes(key);

    const getCountForAppName = (x: string) =>
        assignments &&
        assignments.reduce(
            (acc, { sourceSystem }) => (sourceSystem.subSystem === x ? acc + 1 : acc),
            0
        );

    const [activeNotifications, setActiveNotifications] = useState<string[]>(origins ?? []);

    if (error) {
        return <div>Failed to load assignments</div>;
    }

    if (isLoading) {
        return <CircularProgress size={48} />;
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
                                <div>{`${getCountForAppName(applicationName)} ${capitalize(
                                    applicationName
                                )}`}</div>
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
                    <Accordion>
                        {activeNotifications.map((applicationTitle) => (
                            <Accordion.Item key={applicationTitle}>
                                <Accordion.Header chevronPosition="right">
                                    {capitalize(applicationTitle)}
                                </Accordion.Header>
                                {assignments &&
                                    assignments
                                        .filter(
                                            ({ sourceSystem }) =>
                                                sourceSystem.subSystem === applicationTitle
                                        )
                                        .map((assignment) => (
                                            <Accordion.Panel key={assignment.id}>
                                                <AssignmentCard assignment={assignment} />
                                            </Accordion.Panel>
                                        ))}
                            </Accordion.Item>
                        ))}
                    </Accordion>
                ) : (
                    <>
                        {assignments &&
                            assignments.map((assignment) => (
                                <AssignmentCard key={assignment.id} assignment={assignment} />
                            ))}
                    </>
                )}
            </Assignments>
        </>
    );
}
