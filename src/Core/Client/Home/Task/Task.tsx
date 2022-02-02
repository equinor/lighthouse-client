import { Typography } from '@equinor/eds-core-react';
import NoTasks from './NoTasks';
import { ContentWrapper, Wrapper } from './TaskStyle';

export const Task = (): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h5">Tasks</Typography>

            <ContentWrapper>
                <NoTasks />
            </ContentWrapper>
        </Wrapper>
    );
};
