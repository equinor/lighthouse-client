import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0em 2em;
`;

export const Title = styled.div`
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

export const Divider = styled.div`
    width: 0.5rem;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
`;

export const Section = styled.div`
    display: flex;
    gap: 0.6em;
    flex-direction: column;
    margin: 0.2rem;
    width: 100%;
`;
