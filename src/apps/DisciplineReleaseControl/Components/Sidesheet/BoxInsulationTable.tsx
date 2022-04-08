import { Column, Table } from '@equinor/Table';
import { InsulationBoxType } from '../../Types/pipetest';

type TableProps = {
    insulationBoxes: InsulationBoxType[];
};

export const BoxInsulationTable = ({ insulationBoxes }: TableProps): JSX.Element => {
    if (!insulationBoxes.length) return <h2>No box insulations found</h2>;

    const columns: Column<InsulationBoxType>[] = [
        {
            id: 'objectNo',
            Header: 'Object number',
            accessor: (item) => item.objectNo,
        },
        {
            id: 'objectName',
            Header: 'Object name',
            accessor: (item) => item.objectName,
        },
        {
            id: 'objectStatus',
            Header: 'MIPS status',
            accessor: (item) => item.objectStatus,
        },
        {
            id: 'procosysStatus',
            Header: 'ProCoSys status',
            accessor: (item) => item.procosysStatus,
        },
    ];

    return (
        <>
            <h4>Box insulations:</h4>
            <Table options={{ columns: columns, data: insulationBoxes }}></Table>
        </>
    );
};
