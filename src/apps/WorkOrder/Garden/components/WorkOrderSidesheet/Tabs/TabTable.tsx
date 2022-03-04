import { Column, Table } from '@equinor/Table';
import styled from 'styled-components';
import { WorkOrderMaterial, WorkOrderMccr } from '../../../models';
export const NoResourceData = styled.div`
    text-align: center;
    padding: 20px;
    font-size: 30px;
`;
type Packages = WorkOrderMccr | WorkOrderMaterial;
type TabTableProps<T extends Packages> = {
    packages: T[];
    columns: Column<T>[];
    isFetching: boolean;
    error: Error | null;
    resourceName: string;
};
export const TabTable = <T extends Packages>(props: TabTableProps<T>) => {
    const { packages, columns, error, isFetching, resourceName } = props;

    if (isFetching) return <NoResourceData>{`Fetching ${resourceName}`}</NoResourceData>;
    if (error) return <NoResourceData>{`No ${resourceName}`}</NoResourceData>;
    return <Table options={{ columns, data: packages }} />;
};
