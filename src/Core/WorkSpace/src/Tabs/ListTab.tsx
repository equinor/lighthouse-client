import { useFilteredData } from '@equinor/filter';
import { TableData } from '@equinor/Table';
import { useDataContext } from '../Context/DataProvider';
import { Grid } from '../../../../packages/Grid';
import { useFilter } from '../../../../packages/Filter/Hooks/useFilter';
import { useEffect, useState } from 'react';
import { Button } from '@equinor/eds-core-react';
import { ScopeChangeRequest } from '../../../../apps/ScopeChangeRequest/Types/scopeChangeRequest';

export type FilterModel<T> = {
    [K in keyof T]?: Model;
};
export interface Model {
    type: 'set';
    values: string[];
}
export const ListTab = (): JSX.Element | null => {
    const { data } = useFilteredData<TableData>();
    const { filter, filterData } = useFilter();

    const [filterModel, setFilterModel] = useState<FilterModel<ScopeChangeRequest>>({});

    useEffect(() => {
        console.log("Top filtermodel changed", filterModel)
    }, [filterModel]);

    const { tableOptions } = useDataContext();
    if (!data || data.length === 0) {
        return null;
    }

    const a: FilterModel<ScopeChangeRequest> = {
        actualChangeHours: {
            type: 'set',
            values: ['1'],
        },
    };

    return (
        <>
            <Button onClick={() => setFilterModel(a)}>Filter some stuff</Button>
            <Grid data={data} options={tableOptions} filterModel={filterModel} setFilterModel={setFilterModel} />
        </>
    );
};
