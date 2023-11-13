import { tokens } from '@equinor/eds-tokens';
import { Link as LinkItem } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 1rem;
    flex: 1;
    margin-left: 1rem;
    background-color: ${tokens.colors.ui.background__light.rgba};

    :first-child {
        margin-left: 0;
    }
`;

export const Link = styled(LinkItem)`
    text-decoration: none;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const KpiWrapper = styled.div`
    display: flex;
`;
