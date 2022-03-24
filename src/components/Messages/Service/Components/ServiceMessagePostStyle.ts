import styled from 'styled-components';

export const ScrimContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    height: -webkit-fill-available;
    background: white;
    max-width: 90vh;
    overflow: scroll;
`;

export const Container = styled.div`
    min-width: 60vh;
    align-content: stretch;
    align-items: center;
    justify-content: center;
    padding: 2em;
`;
