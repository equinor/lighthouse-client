import { Table } from "@equinor/eds-core-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TableOptions } from "../../CompletionView/src/DataViewerApi/DataViewState";
import { useTableContext } from "../Context/TableProvider";
import { sortByKey } from "../Utils/sortByKey";



interface BodyProps<T> {
    data: T[];
    tableOptions: TableOptions;
    setSelected?: (itemId: string) => void
    // start: number;
    // end: number;
    // height: number;
}

const Cell = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export function Body<T>({ data, tableOptions, setSelected }: BodyProps<T>) {

    const { headers, activeHeader, sortDirection } = useTableContext();
    const [items, setItems] = useState<T[]>([])

    useEffect(() => {
        const items = sortByKey(data, activeHeader as keyof T, sortDirection).slice(0, 150);
        setItems(items);
    }, [sortDirection, activeHeader, data])

    function handleOnClick<T extends Object>(item: T) {
        setSelected && setSelected(item[tableOptions.objectIdentifierKey])
    }

    return (
        <Table.Body>
            {items.map((itemRow, rowindex) => (
                <Table.Row key={`Row-${itemRow[tableOptions.objectIdentifierKey]}-${rowindex}`} style={{ height: "35px" }} onClick={() => handleOnClick(itemRow)}>
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
        </Table.Body >

    );
}