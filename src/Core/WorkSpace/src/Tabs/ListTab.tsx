import { useFilteredData } from '@equinor/filter';
import { TableData } from '@equinor/Table';
import { useDataContext } from '../Context/DataProvider';
import { Grid } from '../../../../packages/Grid';

export const ListTab = (): JSX.Element | null => {
    const { data } = useFilteredData<TableData>();
    const { tableOptions } = useDataContext();

    return <Grid data={data} options={tableOptions} />;
};
