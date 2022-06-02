import { ColumnApi } from 'ag-grid-community';
import styled from 'styled-components';
import { ColumnPicker } from './ColumnPicker/ColumnPicker';

interface TableConfigBarProps {
    columnApi: ColumnApi | null;
}

export const TableConfigBar = ({ columnApi }: TableConfigBarProps): JSX.Element => {
    return (
        <TableConfigBarWrapper>
            {columnApi && <ColumnPicker columnApi={columnApi} />}
        </TableConfigBarWrapper>
    );
};

const TableConfigBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
`;
