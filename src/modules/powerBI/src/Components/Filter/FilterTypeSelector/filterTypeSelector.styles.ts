import styled from 'styled-components';

export const FilterTypeSelectorWrapper = styled.div`
    padding: 1px 16px;
    background-color: white;
    min-width: 300px;
    overflow: scroll;
`;

export const Options = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: white;
`;

export const Header = styled.div`
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background-color: #f7f7f7;
    border-bottom: 2px solid #dcdcdc;
`;
