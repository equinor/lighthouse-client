import { EdsProvider, Table } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useState } from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";

const TableHeaderTitle = styled.p`
    :first-letter {
        text-transform:capitalize;
    }
`;

const Cell = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

function sortByKey<T, K extends keyof T>(list: T[], key: K, direction: boolean) {
    if (key === "") return list;
    return list.sort((a, b) => {
        if (direction) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
        } else {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
        }
        return 0;
    });
}

export function ListView<T extends Object>({ data, }: { data: T[], initialKey: keyof T }) {
    const [key, setKey] = useState<string>("")
    const [sortDirection, setSortDirection] = useState(false);
    const [activeRow, setActiveRow] = useState("")

    const maxLength = 50;
    return (
        <EdsProvider density={"compact"}>
            {data.length > 0 && < Table >
                <Table.Head>
                    <Table.Row>
                        {Object.keys(data[0]).map((col, index) => (
                            <Table.Cell width={500} style={{ backgroundColor: col === key ? tokens.colors.ui.background__info.rgba : "" }} key={index + col} rowSpan={1} onClick={() => {
                                setKey(col)
                                col === key && setSortDirection(d => !d)
                            }
                            }>

                                {col}
                                {col === key && <Icon
                                    name={
                                        sortDirection
                                            ? 'chevron_up'
                                            : 'chevron_down'
                                    }
                                />}

                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body >
                    {[...sortByKey(data, key as keyof T, sortDirection)].splice(0, 50).map((itemRow, rowindex) => (
                        <>
                            <Table.Row key={itemRow.toString() + rowindex} style={{ height: "35px" }} onClick={() => { setActiveRow(state => state == itemRow.toString() + rowindex ? "" : itemRow.toString() + rowindex) }}>
                                {Object.keys(itemRow).map((cellKey: string, index: number) => (
                                    <>
                                        <Table.Cell title={itemRow[cellKey]} variant="text" style={{ height: "125px !important" }} key={cellKey + index}>
                                            <Cell>
                                                {`${itemRow[cellKey] || "-"}`.slice(0, maxLength).concat((`${itemRow[cellKey]}`.length > maxLength) ? "..." : "")}
                                            </Cell>
                                        </Table.Cell>
                                    </>
                                ))}
                            </Table.Row>
                            {
                                (activeRow == (itemRow.toString() + rowindex)) && (
                                    <Table.Row>
                                        <Table.Cell colSpan={Object.keys(itemRow).length} variant="text">
                                            Dette er en test å di!!!
                                        </Table.Cell>
                                    </Table.Row>)
                            }
                        </>
                    ))}
                </Table.Body>
            </Table >}
        </EdsProvider >
    )
}


