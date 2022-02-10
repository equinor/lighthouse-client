import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.2em;
    align-items: flex-start;
    width: 100%;
`;

interface SectionTitleProps {
    faded?: boolean;
    bold?: boolean;
    fontSize?: 'x-large' | 'large' | 'xx-large' | 'x-small';
}

export const SectionText = styled.div`
    display: flex;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
    line-height: 16px;
    opacity: ${(x: SectionTitleProps) => (x.faded ? '0.7' : '')};
    margin: 0.2rem;
    font-size: ${(x: SectionTitleProps) => x.fontSize};
    font-weight: ${(x: SectionTitleProps) => (x.bold ? 'bold' : '')};
    width: -webkit-fill-available;
    justify-content: space-between;
`;

export const SectionRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
`;
