import { Checkbox } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const FilterItemWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover
            .rgba};
    }
`;

export const FilterItemLabel = styled.label`
    cursor: pointer;
    padding-left: 0.5rem !important;
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

export const AllCheckbox = styled(Checkbox)`
    padding-left: 0.5rem !important;
`;
