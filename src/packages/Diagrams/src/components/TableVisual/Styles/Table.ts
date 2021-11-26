import { Chip } from '@equinor/eds-core-react';
import styled from 'styled-components';

export const TableWrapper = styled.div`
    display: inline-block;
    border-spacing: 0;
`;

export const TableRow = styled.div`
    border-bottom: 1px solid rgba(224, 224, 224, 1);

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
    :last-child {
        border-bottom: 2px solid rgba(224, 224, 224, 1);
    }
`;
export const FooterRow = styled.div`
    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }
`;

export const TableCell = styled.div`
    padding: 10px 0px 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: start;
`;

export const TableHeadCell = styled.div`
    padding: 10px 0px 0px 10px;

    font-size: 0.875rem;
    height: 35px;
    font-weight: 500;
    background-color: rgb(247, 247, 247);
    line-height: 1.5rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* :last-child {
        border-right: none;
    } */
`;

export const TypeChip = styled(Chip)`
    margin: 0.2rem;
`;

export const TypeWrapper = styled.div`
    display: flex;
`;
