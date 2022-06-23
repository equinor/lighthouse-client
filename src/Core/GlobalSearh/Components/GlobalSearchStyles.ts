import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    min-width: 250px;
    width: 30vw;
    max-width: 500px;
`;
export const SearchResult = styled.div`
    position: absolute;
    top: 36px;
    width: 500px;
    background: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    max-height: 90vh;
    overflow-y: auto;
`;
