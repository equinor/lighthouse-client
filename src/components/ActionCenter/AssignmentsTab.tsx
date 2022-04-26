import { tokens } from '@equinor/eds-tokens';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { AssignmentList } from './AssignmentList';
import { GroupedAssignments } from './GroupedAssignments';

export function AssignmentsTab(): JSX.Element {
    const mockAssignments: Assignment[] = [
        {
            id: Math.random().toString(),
            dueDate: new Date('2021-05-05').toString(),
            origin: 'Scope change',
            title: 'Request to sign',
            url: 'www.google.com',
        },
        {
            id: Math.random().toString(),
            dueDate: new Date('2022-04-04').toString(),
            origin: 'Scope change',
            title: 'Request to sign',
            url: 'www.google.com',
        },
        {
            id: Math.random().toString(),
            dueDate: new Date().toString(),
            origin: 'Scope change',
            title: 'Request to sign',
            url: 'www.google.com',
        },
        {
            id: Math.random().toString(),
            dueDate: new Date().toString(),
            origin: 'release control',
            title: 'Release to sign',
            url: 'www.google.com',
        },
        {
            id: Math.random().toString(),
            dueDate: new Date().toString(),
            origin: 'release control',
            title: 'Release to sign',
            url: 'www.google.com',
        },
        {
            id: Math.random().toString(),
            dueDate: new Date().toString(),
            origin: 'release control',
            title: 'Release to sign',
            url: 'www.google.com',
        },
    ];

    const origins = useMemo(
        () => mockAssignments.map((x) => x.origin).filter((v, i, a) => v && a.indexOf(v) === i),
        []
    );

    const [isGroupedBySource, setIsGroupedBySource] = useState(true);
    const toggleGroup = () => setIsGroupedBySource((prev) => !prev);

    return (
        <>
            <Assignments>
                {isGroupedBySource ? (
                    <GroupedAssignments
                        origins={origins}
                        assignments={mockAssignments}
                        ungroup={toggleGroup}
                    />
                ) : (
                    <AssignmentList
                        assignments={mockAssignments}
                        groupBySource={toggleGroup}
                        origins={origins}
                    />
                )}
            </Assignments>
        </>
    );
}

export interface Assignment {
    id: string;
    origin: string;
    title: string;
    url: string;
    dueDate: string;
}

const Assignments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0em;
    padding: 1em 0em;
`;

interface AssignmentCardProps {
    assignment: Assignment;
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
    const isToday =
        new Date().toLocaleDateString() === new Date(assignment.dueDate).toLocaleDateString();

    return (
        <Wrapper onClick={() => console.log(assignment.id)}>
            <LeftSection>
                {/* TODO: resolve EDS colors */}
                <svg
                    width={15}
                    height={15}
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="6" cy="6" r="5.5" fill={'#B276B2'} />
                </svg>
                <DetailText>
                    <NotificationTitle>{assignment.title}</NotificationTitle>
                </DetailText>
            </LeftSection>
            <RightSection>
                <DueDate overdue={new Date() > new Date(assignment.dueDate)}>
                    {isToday
                        ? 'Due today'
                        : `Due ${DateTime.fromJSDate(new Date(assignment.dueDate)).toRelative({
                            unit: 'days',
                        })}`}
                </DueDate>
            </RightSection>
        </Wrapper>
    );
};

export const DueDate = styled.div<{ overdue: boolean }>`
    font-size: 16px;
    color: ${(p) =>
        p.overdue
            ? tokens.colors.infographic.primary__energy_red_100.hex
            : tokens.colors.text.static_icons__default.hex};
`;

export const NotificationTitle = styled.div`
    font-size: 16px;
`;
export const TimeStamp = styled.div`
    font-size: 10px;
`;

export const RightSection = styled.div`
    display: flex;
`;

export const LeftSection = styled.div`
    display: flex;
    gap: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

export const Wrapper = styled.div`
    display: flex;
    height: 32px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    /* border-top: 1px #e7deea solid; */
`;

export const DetailText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
