import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
`;

export const LineBreaks = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Details = styled.div`
    max-width: 500px;
    font-size: 16px;
    text-overflow: ellipsis;
`;

export const MetaData = styled.div`
    font-size: 10px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;

export const Inline = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 650px;
    padding: 0.2em 0em;
    gap: 0.5em;
    :hover {
        text-decoration: 1px ${tokens.colors.interactive.primary__resting.hex} underline;
        cursor: pointer;
    }
`;

export const Link = styled.span`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
`;
