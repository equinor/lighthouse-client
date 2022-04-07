import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

type FilterWrapperProps = {
    isFilterActive: boolean;
};
export const FilterWrapper = styled.div<FilterWrapperProps>`
    display: ${(props) => (props.isFilterActive ? 'flex' : 'none')};
    background: ${tokens.colors.ui.background__light.rgba};
    border-bottom: 1.5px solid ${tokens.colors.ui.background__medium.rgba};
    height: 200px;
    overflow-x: auto;
`;

export const FilterGroupWrap = styled.div`
    border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const FilterItemsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
`;

export const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
`;

export const Item = styled(Button)`
    width: 36px;
    height: 36px;
`;
