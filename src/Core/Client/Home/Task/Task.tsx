import { Typography } from '@equinor/eds-core-react';
import { AssignmentsTab } from '../../../Assignments/Components/AssignmentsTab';
import { Wrapper, Header } from './TaskStyle';

export const Task = (): JSX.Element => {
    return (
        <Wrapper>
            <Header>
                <Typography variant="h5">Assignments</Typography>
            </Header>

            <AssignmentsTab />
        </Wrapper>
    );
};
