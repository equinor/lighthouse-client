import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 100px;
    height: '-webkit-fill-available';
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;
export const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
`;

export const Info = styled.p`
    color: ${tokens.colors.interactive.warning__resting.rgba};
    font-weight: 500;
`;

export const Iframe = styled.iframe`
    background-color: ${tokens.colors.ui.background__medium.rgba};
    border: none;
    border-radius: 5px;
    width: 50%;
    height: 500px;
`;
