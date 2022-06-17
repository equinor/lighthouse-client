import { Column, Table } from '@equinor/Table';
import { CheckListType } from '../../Types/pipetest';
import { CheckListStatusCell } from './CheckListStatusCell';

type TableProps = {
    checkLists: CheckListType[];
};

export const CheckListTable = ({ checkLists }: TableProps): JSX.Element => {
    if (!checkLists.length) return <h2>No checklists found</h2>;

    const rowHeight = 35;

    const columns: Column<CheckListType>[] = [
        {
            id: 'tagNo',
            Header: 'Tag',
            accessor: (item) => item.tagNo,
        },
        {
            id: 'revision',
            Header: 'Revision',
            accessor: (item) => item.revision,
        },
        {
            id: 'formularType',
            Header: 'Formular type',
            accessor: (item) => item.formularType,
        },
        {
            id: 'responsible',
            Header: 'Responsible',
            accessor: (item) => item.responsible,
        },
        {
            id: 'status',
            Header: 'Status',
            accessor: (item) => item,
            Cell: CheckListStatusCell,
        },
    ];

    return (
        <>
            <h4>Pipetest checklists:</h4>
            <Table
                data={checkLists}
                columns={columns}
                options={{}}
                height={rowHeight + checkLists?.length * rowHeight}
            />
        </>
    );
};
