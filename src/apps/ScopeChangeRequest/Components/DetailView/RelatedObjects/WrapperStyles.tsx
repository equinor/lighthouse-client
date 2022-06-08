import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
    gap: 0.8em;

    :hover {
        text-decoration: 1px ${tokens.colors.interactive.primary__resting.hex} underline;
        cursor: pointer;
    }
`;

export const Link = styled.div`
    font-size: 16px;
`;

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MainText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
export const MetaData = styled.div`
    font-size: 10px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;
