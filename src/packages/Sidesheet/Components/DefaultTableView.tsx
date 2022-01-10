import { Table, useColumns } from '@equinor/Table';

interface DefaultTableViewProps {
    data: any[];
}

export const DefaultTableView = ({ data }: DefaultTableViewProps): JSX.Element => {
    const columns = useColumns(data[0]);
    return (
        <>
            <Table options={{ data, columns }} />
        </>
    );
};
