import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';

const SupportButtonWrapper = styled.button`
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: ${tokens.colors.ui.background__light.rgba} !important;
    width: 50px;
    height: 50px;
    border: 0;
    border-radius: 50%;
`;

export const SupportButton = (): JSX.Element => {
    return (
        <SupportButtonWrapper>
            <Icon name="support" color={tokens.colors.ui.background__medium.rgba} />
        </SupportButtonWrapper>
    );
};
