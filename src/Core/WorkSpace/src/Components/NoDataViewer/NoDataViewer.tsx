import { tokens } from '@equinor/eds-tokens';
import Icon from '../../../../../components/Icon/Icon';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { Heading, Iframe, Info, Wrapper } from './NoDataViewer-Styles';

export const NoDataViewer = (): JSX.Element => {
    const { name } = useWorkSpace();
    return (
        <Wrapper>
            <Icon
                name={'warning_outlined'}
                color={tokens.colors.interactive.warning__resting.rgba}
                size={48}
            />
            <Heading>No data viewer is configured!</Heading>
            <Info>{name}</Info>
            <Iframe src="./dataView.md"></Iframe>
        </Wrapper>
    );
};
