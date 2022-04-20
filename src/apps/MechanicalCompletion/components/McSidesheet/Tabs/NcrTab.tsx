import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
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
        accessor: ({ url, documentNumber }) => ({
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
            content: documentNumber,
        }),
        Cell: CellWithLink,
        width: 100,
    },
    {
        id: 'title',
        Header: 'Title',
        accessor: (ncr) => ncr.title,
        width: 600,
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
