import { Typography } from '@equinor/eds-core-react';
import { Wrapper } from './StatusStyles';

export const Status = (): JSX.Element => {
    return (
        <Wrapper>
            <Typography variant="h5">Status</Typography>
            {/* <Background /> */}
        </Wrapper>
    );
};
