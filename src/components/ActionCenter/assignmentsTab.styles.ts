import styled from 'styled-components';

export const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
`;

export const ActiveOrigins = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 0em 1em;
`;

export const Assignments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em 0em;
`;

export const Transition = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
