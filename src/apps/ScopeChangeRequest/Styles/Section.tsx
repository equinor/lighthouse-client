import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: flex-start;
`;

interface SectionTitleProps {
    faded?: boolean;
    bold?: boolean;
    fontSize?: string;
}

export const SectionText = styled.div`
    display: flex;
    opacity: ${(x: SectionTitleProps) => (x.faded ? '0.7' : '')};
    margin: 0.2rem;
    font-size: ${(x: SectionTitleProps) => x.fontSize};
    font-weight: ${(x: SectionTitleProps) => (x.bold ? 'bold' : '')};
`;

export const SectionRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    justify-content: flex-start;
`;
