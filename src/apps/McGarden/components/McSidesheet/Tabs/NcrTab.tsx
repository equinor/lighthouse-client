import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { McNcr } from '../types';

export type NcrTabProps = {
    packages: McNcr[];
    isFetching: boolean;
    error: Error | null;
};

const columns: Column<McNcr>[] = [
    {
        id: 'documentNumber',
        Header: 'Doc.no',
        accessor: ({ url, documentNumber }) => ({ url, content: documentNumber }),
        Cell: CellWithLink,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (ncr) => ncr.title,
    },
];
export const NcrTab = ({ packages, error, isFetching }: NcrTabProps) => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            error={error}
            resourceName="NCr"
        />
    );
};
