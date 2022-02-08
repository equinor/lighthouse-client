import { Avatar, Icon } from '@equinor/eds-core-react';
import {
    DetailGroup,
    Details,
    DetailsLabel,
    Link,
    Name,
    Status,
    UserGroup,
    Wrapper,
} from './TaskItemStyles';
import { ProcosysTasks } from './types';

type TaskItemProps = ProcosysTasks & { userImageUrl?: string };

export function TaskItem(props: TaskItemProps): JSX.Element {
    return (
        <Wrapper>
            <Link href={props.url}>{props.title}</Link>
            <Details>
                <DetailGroup>
                    <div>
                        <DetailsLabel>Assigned to:</DetailsLabel>
                        <UserGroup>
                            {!props.userImageUrl ? (
                                <Icon name="account_circle" />
                            ) : (
                                <Avatar alt="User avatar" src={props.userImageUrl} />
                            )}
                            <Name>{props.assignedTo.person.name}</Name>
                        </UserGroup>
                    </div>
                    <div>
                        <DetailsLabel>Due date:</DetailsLabel>
                        <UserGroup>{new Date(props.dueDate).toLocaleDateString()}</UserGroup>
                    </div>
                </DetailGroup>
                <DetailGroup style={{ justifyContent: 'flex-end' }}>
                    <Status
                        style={{ width: '4rem', textAlign: 'center' }}
                        variant={
                            new Date().getTime() <= new Date(props.dueDate).getTime()
                                ? 'active'
                                : 'error'
                        }
                    >
                        {new Date().getTime() <= new Date(props.dueDate).getTime()
                            ? 'Active'
                            : 'Overdue'}
                    </Status>
                </DetailGroup>
            </Details>
        </Wrapper>
    );
}
