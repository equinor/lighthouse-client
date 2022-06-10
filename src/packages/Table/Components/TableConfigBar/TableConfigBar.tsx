import styled from 'styled-components';
import { tabApis } from '../../../../Core/WorkSpace/src/Context/LocationProvider';
import { ColumnPicker } from './ColumnPicker/ColumnPicker';

export const TableConfigBar = (): JSX.Element => {
    const getApi = tabApis.useAtomState((s) => s.table.getApi);

    return (
        <TableConfigBarWrapper>{getApi && <ColumnPicker getApi={getApi} />}</TableConfigBarWrapper>
    );
};

const TableConfigBarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
`;
