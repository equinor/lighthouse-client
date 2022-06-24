import { Column, defaultGroupByFn, Table } from '@equinor/Table';
import styled from 'styled-components';
export const NoResourceData = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 30px;
`;
type TabTableProps<T extends Record<string | number, unknown>> = {
    packages: T[] | undefined;
    columns: Column<T>[];
    isFetching: boolean;
    error: Error | null;
    resourceName: string;
    height?: number;
};
/**
 * Component for displaying data in tabular format inside the Garden's package sidesheet.
 */
export const TabTable = <T extends Record<string | number, unknown>>(
    props: TabTableProps<T>
): JSX.Element => {
    const { packages, columns, error, isFetching, resourceName, height } = props;
    if (isFetching) return <NoResourceData>{`Fetching ${resourceName}`}</NoResourceData>;
    if (error || packages === undefined || packages.length === 0) {
        return <NoResourceData>{`No ${resourceName}`}</NoResourceData>;
    }
    return (
        <Table
            columns={columns}
            data={packages}
            options={{ groupByFn: defaultGroupByFn }}
            height={height}
        />
    );
};
