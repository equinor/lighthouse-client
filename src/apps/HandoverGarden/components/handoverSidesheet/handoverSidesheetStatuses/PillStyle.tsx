import styled from 'styled-components';

export type PillProps = {
    backgroundImage: string;
    color: string;
    visibility?: 'hidden' | 'visible';
};
export const Pill = styled.small<PillProps>`
    border-radius: 4px;
    font-size: 11px;
    padding: 4px 6px;
    display: inline-block;
    background-image: ${(props) => props.backgroundImage};
    color: ${(props) => props.color};
    visibility: ${(props) => props?.visibility || 'visible'};
`;
