import { EdsProvider, Table } from "@equinor/eds-core-react";
import styled from "styled-components";
import { TableOptions } from "../../CompletionView/src/DataViewerApi/DataViewState";
import { TableProvider } from "../Context/TableProvider";
import { Body } from "./Body";
import { Header } from "./Header";


const TableHeaderTitle = styled.p`
    :first-letter {
        text-transform:capitalize;
    }
`;


interface DataTableProps<T> {
    data: T[],
    tableOptions?: TableOptions,
    setSelected?: (itemId: string) => void
}

export function DataTable<T>({ data, tableOptions, setSelected }: DataTableProps<T>) {


    if (!tableOptions) return null;
    return (
        <EdsProvider density={"compact"}>
            {data.length > 0 &&
                <TableProvider headerOptions={tableOptions?.headers} defaultHeaderItem={data[0]} >
                    < Table >
                        <Header />
                        <Body
                            data={data}
                            tableOptions={tableOptions}
                        />

                    </Table >
                </TableProvider>
            }
        </EdsProvider >
    )
}

