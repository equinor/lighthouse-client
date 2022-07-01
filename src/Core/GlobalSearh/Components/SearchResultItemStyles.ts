import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div<{ isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 48px;
    cursor: pointer;
    background: ${({ isSelected }) =>
        isSelected ? tokens.colors.interactive.text_highlight.hex : 'none'};
    :hover {
        background: ${tokens.colors.interactive.text_highlight.hex};
    }
`;

export const SearchItemWrapper = styled.div`
    width: 620px;
`;

export const Title = styled(Typography)`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    padding: 0.25rem 0rem;
    color: ${tokens.colors.interactive.primary__resting.rgba};
`;
export const Description = styled(Typography)`
    font-style: normal;
    font-weight: 500;
    font-size: 12px !important;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const DescriptionWrapper = styled.div`
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
export const Divider = styled.span`
    padding: 0.25rem;
`;

export const VerticalMenu = styled.div`
    padding: 0.5rem;
`;
