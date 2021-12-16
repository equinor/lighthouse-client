import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
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
    opacity: ${(x: SectionTitleProps) => (x.faded ? '0.7' : '')};
    margin: 0.2rem;
    font-size: ${(x: SectionTitleProps) => x.fontSize};
    font-weight: ${(x: SectionTitleProps) => (x.bold ? 'bold' : '')};
    width: 100%;
`;

export const SectionRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;
