import { Table } from "@equinor/eds-core-react";
import styled from "styled-components";
import { TableOptions } from "../../CompletionView/src/DataViewerApi/DataViewState";
import { useTableContext } from "../Context/TableProvider";
import { sortByKey } from "../Utils/sortByKey";



interface BodyProps<T> {
    data: T[];
    tableOptions: TableOptions;
}

const Cell = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export function Body<T>({ data, tableOptions }: BodyProps<T>) {
    const { headers, activeHeader, sortDirection } = useTableContext();

    function handleOnClick<T extends Object>(item: T, index: number) {

    }

    return (
        <Table.Body >
            {[...sortByKey(data, activeHeader as keyof T, sortDirection)].splice(0, 50).map((itemRow, rowindex) => (

                <Table.Row key={`Row-${itemRow[tableOptions.objectIdentifierKey]}-${rowindex}`} style={{ height: "35px" }} onClick={() => handleOnClick(itemRow, rowindex)}>
                    {
                        headers.map((item, index) => {
                            const cellData = itemRow[item.key]
                            return (
                                <Table.Cell
                                    title={cellData}
                                    variant="text"
                                    key={`Cell-${cellData}-${rowindex}-${index}`}>
                                    {
                                        !Array.isArray(cellData) ?
                                            <Cell>
                                                {itemRow[item.key]}
                                            </Cell> : null
                                    }
                                </Table.Cell>
                            )
                        })
                    }
                </Table.Row>


            ))}
        </Table.Body>
    );
}