import { Checkbox } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const AllCheckbox = styled(Checkbox)`
    padding-left: 0.5rem !important;
`;

export const FilterItemName = styled.span`
    cursor: pointer;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const Count = styled.span`
    font-size: 12px;
`;

export const FilterItemWrap = styled.div`
    grid-template-columns: 1fr 24fr 1fr;
    width: 100%;
    display: grid;
    align-items: center;
    height: 32px;

    > span {
        padding: 0px;

        > svg {
            width: 18px;
            height: 18px;
        }
    }
    :hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
