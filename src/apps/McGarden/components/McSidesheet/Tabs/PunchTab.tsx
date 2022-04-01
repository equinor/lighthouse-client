import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { McPunchItem } from '../types';

export type PunchTabProps = {
    packages: McPunchItem[];
    isFetching: boolean;
    error: Error | null;
};

const columns: Column<McPunchItem>[] = [
    {
        id: 'tagNumber',
        Header: 'TagNo',
        accessor: ({ url, tagNumber }) => ({ url, content: tagNumber }),
        Cell: CellWithLink,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (punch) => punch.description,
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (punch) => punch.status,
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
