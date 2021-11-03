import { EdsProvider, Table } from "@equinor/eds-core-react";
import { useState } from "react";
import styled from "styled-components";
import { TableOptions } from "../../CompletionView/src/DataViewerApi/DataViewState";
import { TableProvider, useTableContext } from "../Context/TableProvider";
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
    const { headers } = useTableContext()
    const [key, setKey] = useState<string>("")
    const [sortDirection, setSortDirection] = useState(false);
    const [activeRow, setActiveRow] = useState("")

    function handleOnClick<T extends Object>(item: T, index: number) {
        setActiveRow(state => state == item[tableOptions?.objectIdentifierKey || ""] + index ? "" : item[tableOptions?.objectIdentifierKey || ""] + index);
        setSelected && setSelected(item[tableOptions?.objectIdentifierKey || ""])
    }
    console.log("DataTable, headers", headers);
    if (!tableOptions) return null;
    return (
        <EdsProvider density={"compact"}>
            {data.length > 0 &&
                <TableProvider headerOptions={tableOptions?.headers} defaultHeaderItem={data[0]} >
                    < Table >
                        <Header
                            setSortDirection={setSortDirection}
                            sortDirection={sortDirection}
                            activeCellKey={key}
                            setActiveCellKey={setKey}
                        />
                        <Body data={data} tableOptions={tableOptions} />
                        {/* <Table.Body >
                            {[...sortByKey(data, key as keyof T, sortDirection)].splice(0, 50).map((itemRow, rowindex) => (

                                <Table.Row key={`Row-${itemRow[tableOptions.objectIdentifierKey]}-${rowindex}`} style={{ height: "35px" }} onClick={() => handleOnClick(itemRow, rowindex)}>
                                    {


                                        // headers.map((item, index) => {
                                        //     const cellData = itemRow[item.key]
                                        //     return (
                                        //         <Table.Cell
                                        //             title={cellData}
                                        //             variant="text"
                                        //             key={`Cell-${cellData}-${rowindex}-${index}`}>
                                        //             {
                                        //                 !Array.isArray(cellData) ?
                                        //                     <Cell>
                                        //                         {itemRow[item.key]}
                                        //                     </Cell> : null
                                        //             }
                                        //         </Table.Cell>
                                        //     )
                                        // })
                                    }
                                </Table.Row>


                            ))}
                        </Table.Body> */}
                    </Table >
                </TableProvider>
            }
        </EdsProvider >
    )
}


{/* {
                                (activeRow == (itemRow[tableOptions?.objectIdentifierKey || ""] + rowindex)) && (
                                    <Table.Row>
                                        <Table.Cell colSpan={Object.keys(itemRow).length} variant="text">
                                            Dette er en test å di!!!
                                        </Table.Cell>
                                    </Table.Row>)
                            } */}