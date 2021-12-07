import { tokens } from '@equinor/eds-tokens';
import Icon from '../../../../Icon/Icon';
import { useDataViewer } from '../../DataViewerApi/useDataViewer';
import { Heading, Iframe, Info, Wrapper } from './NoDataViewer-Styles';

export const NoDataViewer = (): JSX.Element => {
    const { name } = useDataViewer();
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
