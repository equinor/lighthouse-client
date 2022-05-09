import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { isProduction } from '@equinor/portal-client';
import { Column, DescriptionCell } from '@equinor/Table';
import { McPunchItem } from '../types';

export type PunchTabProps = {
    packages: McPunchItem[] | undefined;
    isFetching: boolean;
    error: Error | null;
};

const columns: Column<McPunchItem>[] = [
    {
        id: 'tagNumber',
        Header: 'TagNo',
        accessor: ({ url, tagNumber }) => ({
            url: isProduction() ? url : url.replace('procosys', 'procosystest'),
            content: tagNumber,
        }),
        Cell: CellWithLink,
        width: 100,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (punch) => ({ content: punch, currentKey: 'description' }),
        width: 400,
        Cell: DescriptionCell,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (punch) => punch.status,
        width: 70,
    },
    {
        id: 'toBeClearedBy',
        Header: 'To be cleared by',
        accessor: (punch) => punch.toBeClearedBy,
    },

    {
        id: 'sorting',
        Header: 'PL sorting',
        accessor: (punch) => `${punch.sorting} ${punch.sortingDescription}`,
    },
];
export const PunchTab = ({ packages, error, isFetching }: PunchTabProps) => {
    return (
        <TabTable
            columns={columns}
            packages={packages}
            isFetching={isFetching}
            error={error}
            resourceName="Punch Items"
        />
    );
};
