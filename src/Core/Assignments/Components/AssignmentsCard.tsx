import { DateTime } from 'luxon';
import { useNavigate } from 'react-router';
import { ClickableIcon } from '../../../packages/Components/Icon';
import { useLocationKey } from '../../../packages/Filter/Hooks/useLocationKey';
import { Assignment } from '../Types/assignment';
import {
    DetailText,
    DueDate,
    LeftSection,
    NotificationTitle,
    RightSection,
    TimeStamp,
    Wrapper,
} from './assignmentCard.styles';
import { handleActionClick } from '../../../components/ActionCenter/handleActionClick';

interface AssignmentCardProps {
    assignment: Assignment;
}

export const AssignmentCard = ({ assignment }: AssignmentCardProps): JSX.Element => {
    const isToday =
        new Date().toLocaleDateString() === assignment.dueDate &&
        new Date(assignment.dueDate).toLocaleDateString();

    const navigate = useNavigate();
    const currentLocation = useLocationKey();

    return (
        <Wrapper
            onClick={() =>
                handleActionClick(
                    assignment.sourceSystem.subSystem,
                    assignment.sourceSystem.identifier,
                    navigate,
                    currentLocation
                )
            }
        >
            <LeftSection>
                {/* TODO: resolve EDS colors */}
                <div style={{ height: '12px', width: '12px' }}>
                    <svg
                        width={15}
                        height={15}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="6" cy="6" r="5.5" fill={'#B276B2'} />
                    </svg>
                </div>
                <DetailText>
                    <NotificationTitle>{assignment.title}</NotificationTitle>
                </DetailText>
            </LeftSection>
            <RightSection>
                {/* {assignment.dueDate && (
                    <DueDate overdue={new Date() > new Date(assignment.dueDate)}>
                        {isToday
                            ? 'Due today'
                            : `Due ${DateTime.fromJSDate(new Date(assignment.dueDate)).toRelative({
                                unit: 'days',
                            })}`}
                    </DueDate>
                )} */}
            </RightSection>
            <TimeStamp>{DateTime.fromJSDate(new Date(assignment.created)).toRelative()}</TimeStamp>
        </Wrapper>
    );
};
