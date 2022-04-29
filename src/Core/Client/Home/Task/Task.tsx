import { Typography } from '@equinor/eds-core-react';
import { AssignmentsTab } from '../../../Assignments/Components/AssignmentsTab';
import { Wrapper } from './TaskStyle';

export const Task = (): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h5">Assignments</Typography>

            <AssignmentsTab />
        </Wrapper>
    );
};
