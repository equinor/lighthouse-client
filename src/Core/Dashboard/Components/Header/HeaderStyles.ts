import { Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    padding: 1rem;
    gap: 1em;
`;

export const ChipTab = styled(Chip)`
    margin-right: 0.5rem;
    padding: 0 1.5rem;

    :hover {
        background-color: ${tokens.colors.ui.background__info.rgba};
    }
`;

export const TabTitle = styled.span`
    font-size: 0.8rem;
`;
