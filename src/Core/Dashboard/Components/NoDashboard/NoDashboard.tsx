import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Heading, Wrapper } from './NoDashboardStyles';

export const NoPages = (): JSX.Element => {
    return (
        <Wrapper>
            <Icon
                name={'warning_outlined'}
                color={tokens.colors.interactive.warning__resting.rgba}
                size={48}
            />
            <Heading>No dashboard is configured!</Heading>
        </Wrapper>
    );
};
