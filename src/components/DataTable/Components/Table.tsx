import { EdsProvider, Table } from "@equinor/eds-core-react";
import { TableOptions } from "../../CompletionView/src/DataViewerApi/DataViewState";
import { TableProvider } from "../Context/TableProvider";
import { Body } from "./Body";
import { Header } from "./Header";

interface DataTableProps<T> {
    data: T[],
    tableOptions?: TableOptions,
    setSelected?: (itemId: string) => void
}

export function DataTable<T>({ data, tableOptions, setSelected }: DataTableProps<T>) {

    if (!tableOptions) return null;

    return (
        <EdsProvider density={"compact"}>
            <TableProvider headerOptions={tableOptions?.headers} defaultHeaderItem={data[0]} >
                < Table >
                    <Header />
                    {data.length > 0 &&
                        <Body
                            data={data}
                            tableOptions={tableOptions}
                            setSelected={setSelected}
                        />
                    }

                </Table >
            </TableProvider>
        </EdsProvider >
    )
}

