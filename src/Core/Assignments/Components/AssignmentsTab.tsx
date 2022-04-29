import { Chip, Checkbox, CircularProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useMemo, useState } from 'react';

import { IconMenu } from '../../../apps/ScopeChangeRequest/Components/MenuButton';
import { AssignmentCard } from './AssignmentsCard';
import { ActiveOrigins, Assignments, Header, Transition } from './assignmentsTab.styles';
import { useAssignments } from '../Hooks/useAssignments';
import { getCountForAppName } from '../../../components/ActionCenter/Utils/getCount';
import { GroupedAssignments } from '../../../components/ActionCenter/GroupedAssignments';
import styled from 'styled-components';

export function AssignmentsTab(): JSX.Element {
    const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    const { assignments, fusionError, proCoSysError, isLoading } = useAssignments();

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

    if (proCoSysError && fusionError) {
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
                {proCoSysError !== null && (
                    <ErrorBanner>
                        <div>Failed to load ProCoSys assignments</div>
                    </ErrorBanner>
                )}

                {fusionError !== null && (
                    <ErrorBanner>
                        <div>Failed to load portal assignments</div>
                    </ErrorBanner>
                )}

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
                <ScrollWrapper>
                    {isGroupedBySource ? (
                        <GroupedAssignments
                            assignments={assignments}
                            activeAssignments={activeAssignments}
                        />
                    ) : (
                        <Wrapper>
                            {assignments &&
                                assignments
                                    .filter(({ sourceSystem }) =>
                                        activeAssignments.includes(sourceSystem.subSystem)
                                    )
                                    .map((assignment) => (
                                        <AssignmentCard
                                            key={assignment.id}
                                            assignment={assignment}
                                        />
                                    ))}
                        </Wrapper>
                    )}
                </ScrollWrapper>
            </Assignments>
        </>
    );
}

const ScrollWrapper = styled.div`
    overflow: scroll;
    padding-bottom: 2rem;
    padding-right: 1em;

    ::-webkit-scrollbar {
        height: 0.2rem;
        width: 0.3rem;
    }
`;

const Wrapper = styled.div`
    &:last-child {
        border-bottom: 1px ${tokens.colors.interactive.disabled__border.hex} solid;
    }
`;

const ErrorBanner = styled.div`
    min-width: 250px;
    min-height: 15px;
    width: -webkit-fill-available;
    height: auto;
    border-radius: 5px;
    background-color: ${tokens.colors.ui.background__danger.hex};
    display: flex;
    align-items: center;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
`;
