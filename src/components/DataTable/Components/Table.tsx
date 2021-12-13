import { EdsProvider, Table } from '@equinor/eds-core-react';
import { TableOptions } from '../../CompletionView/src/DataViewerApi/DataViewState';
import { TableProvider } from '../Context/TableProvider';
import { HeaderData } from '../Utils/generateHeaderKeys';
import { Body } from './Body';
import { Header } from './Header';

interface DataTableProps<T> {
    data: T[];
    tableOptions?: TableOptions<T>;
    setSelected?: (itemId: string) => void;
}

export function DataTable<T>({ data, tableOptions, setSelected }: DataTableProps<T>) {
    if (!tableOptions) return null;

    return (
        <EdsProvider density={'compact'}>
            <TableProvider
                headerOptions={tableOptions?.headers as unknown as HeaderData[]}
                defaultHeaderItem={data[0]}
            >
                <Table>
                    <Header />
                    {data.length > 0 && (
                        <Body data={data} tableOptions={tableOptions} setSelected={setSelected} />
                    )}
                </Table>
            </TableProvider>
        </EdsProvider>
    );
}
