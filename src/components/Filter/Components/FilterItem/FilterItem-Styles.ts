import styled from 'styled-components';

export const FilterItemWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const FilterItemLabel = styled.label`
    cursor: pointer;
`;

export const FilterItemGroupe = styled.span`
    padding: 2px;
    height: 20px;
    > span {
        padding: 0px;

        > svg {
            width: 16px;
            height: 16px;
        }
    }
`;

export const Count = styled.div`
    padding: 0.5rem;
    font-size: 12px;
`;
