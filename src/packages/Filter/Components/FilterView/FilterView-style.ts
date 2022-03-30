import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
    height: ${({ isActive }: { isActive: boolean }) => (isActive ? `200px` : '0px')};
    width: 100%;
    overflow-x: scroll;
    background-color: ${tokens.colors.ui.background__light.rgba};
    border-bottom: ${({ isActive }: { isActive: boolean }) =>
        isActive ? `1.5px solid ${tokens.colors.ui.background__medium.rgba}` : 'none'};
    transition: height 0.35s ease;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    animation-duration: 0.5s;
    animation-name: ${({ isActive }: { isActive: boolean }) => (isActive ? 'fadeIn' : '')};
`;

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
    width: -webkit-fill-available;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

export const FilterGroupWrapper = styled.div``;

export const SearchFilterWrapper = styled.div`
    overflow-x: scroll;
    height: -webkit-fill-available;
`;

export const SelectBar = styled.div`
    display: flex;
    flex-direction: row;
    min-width: max-content;
    background-color: ${tokens.colors.ui.background__light.rgba};
    border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const AddButton = styled(Button)`
    width: 36px;
    height: 36px;
`;
export const SearchButton = styled(Button)`
    width: 36px;
    height: 36px;
`;

export const FilterSelectHeaderGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
