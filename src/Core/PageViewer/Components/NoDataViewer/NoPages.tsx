import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { usePageViewer } from '../../Hooks/usePageViewer';
import { Heading, Info, Wrapper } from './NoPagesStyles';

export const NoPages = (): JSX.Element => {
    const { title } = usePageViewer();

    return (
        <Wrapper>
            <Icon
                name={'warning_outlined'}
                color={tokens.colors.interactive.warning__resting.rgba}
                size={48}
            />
            <Heading>No Page viewer is configured!</Heading>
            <Info>{title}</Info>
        </Wrapper>
    );
};
