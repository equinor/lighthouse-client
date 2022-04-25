import { Column, Table } from '@equinor/Table';
import { InsulationBoxType } from '../../Types/pipetest';
import { InsulationStatusTableCell } from './InsulationStatusTableCell';

type TableProps = {
    insulations: InsulationBoxType[];
    pipeInsulation?: boolean;
    pipetestName?: string;
};

export const InsulationTable = ({
    insulations,
    pipeInsulation,
    pipetestName,
}: TableProps): JSX.Element => {
    if (!insulations.length)
        return (
            <h4>{pipeInsulation ? 'No pipe insulations found' : 'No insulation boxes found'}</h4>
        );

    const columns: Column<InsulationBoxType>[] = [
        {
            id: 'objectNo',
            Header: pipeInsulation ? 'Pipe insulation' : 'Insulation box',
            accessor: (item) => item.objectNo,
            width: 200,
        },
        {
            id: 'objectName',
            Header: 'Description',
            //Remove pipetest name from descripton to make it cleaner/shorter
            accessor: (item) => item.objectName.replace('-' + pipetestName, ''),
            width: 450,
        },
        {
            id: 'objectStatus',
            Header: 'Status',
            accessor: (item) => item.objectStatus,
            width: 100,
        },
        {
            id: 'objectStatusName',
            Header: 'Status',
            accessor: (item) => item.objectStatusName,
            width: 200,
        },
        {
            id: 'procosysStatus',
            Header: 'Checklist',
            accessor: (item) => item,
            width: 100,
            Cell: InsulationStatusTableCell,
        },
    ];

    return (
        <>
            <h4>{pipeInsulation ? 'Pipe insulations:' : 'Box insulations:'}</h4>
            <Table
                options={{ columns: columns, data: insulations }}
                height={35 + insulations?.length * 35}
            ></Table>
        </>
    );
};
