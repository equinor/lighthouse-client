import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 200px;
    overflow: hidden;
    overflow-x: auto;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

interface FilterSelectProps {
    isActive: boolean;
}

export const FilterSelect = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    padding: 0.5rem;
    overflow: hidden;
    border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};

    label {
        font-size: 1rem;
        padding: 0;
        span {
            padding: 0.1rem;
        }
        svg {
            height: 16px;
            width: 16px;
        }
    }
`;
export const FilterGroups = styled.div`
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

export const FilterGroupWrapper = styled.div``;

export const SelectBar = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    min-width: max-content;
    background-color: ${tokens.colors.ui.background__light.rgba};
    border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
