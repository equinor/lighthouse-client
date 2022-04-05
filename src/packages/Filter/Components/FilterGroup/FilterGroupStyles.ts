import { Button, Checkbox } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const Title = styled.h4`
    margin: 0.2rem;
    white-space: nowrap;
    font-size: 14px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    padding-right: 0;
    width: auto;
    max-width: 500px;
    text-overflow: ellipsis;
    height: fit-content;
    word-wrap: break-word;
    max-height: 180px;

    label {
        padding: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
            padding: 0rem;
        }
        svg {
            height: 18px;
            width: 18px;
        }
    }
`;

export const FilterGroupWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        height: 0.1rem;
        width: 0.3rem;
    }
`;
export const FilterItemWrapper = styled.div`
    padding-bottom: 1rem;
`;

export const FilterHeaderGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SearchButton = styled(Button)`
    width: 36px;
    height: 36px;
`;

export const AllCheckbox = styled(Checkbox)`
    grid-template-columns: auto 1fr auto;
    display: grid;
    max-width: 500px;
    align-items: center;
    padding-top: 2px;
    padding-bottom: 2px;
    span {
        font-size: 13px;
        padding: 0px;

        :first-child {
            padding-right: 2px;
        }
    }
`;
