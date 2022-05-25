import { TableAPI } from '@equinor/Table';
import styled from 'styled-components';
import { ColumnPicker } from './ColumnPicker/ColumnPicker';

interface TableConfigBarProps {
    getTableApi: () => TableAPI;
}

export const TableConfigBar = ({ getTableApi }: TableConfigBarProps): JSX.Element => {
    return (
        <TableConfigBarWrapper>
            {getTableApi && <ColumnPicker getApi={getTableApi} />}
        </TableConfigBarWrapper>
    );
};

const TableConfigBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
`;
