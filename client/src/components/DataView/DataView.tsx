import { EdsProvider, Table, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";

const TableHeaderTitle = styled.p`
    :first-letter {
        text-transform:capitalize;
    }
`;

const data = [
    {
        id: "1234",
        name: "hello World ",
        test: 30,
        accessor: "te"
    },
    {
        id: "1234",
        name: "hello three ",
        test: 30,
        accessor: "te"

    },
    {
        id: "1234",
        name: "No hell no hello",
        test: 30,
        accessor: "te"

    },
    {
        id: "1234",
        name: "hello på do",
        test: 30,
        accessor: "te"

    }
]



export const DataView = () => {
    return (
        <EdsProvider density={"compact"}>
            < Table >
                <Table.Caption>
                    <Typography variant="h2">Home</Typography>
                </Table.Caption>
                <Table.Head>
                    <Table.Row>
                        {Object.keys(data[0]).map((col, index) => (
                            <Table.Cell key={index + col}>
                                <TableHeaderTitle>
                                    {col}
                                </TableHeaderTitle>
                            </Table.Cell>
                        ))}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {data.map((itemRow, index) => (
                        <Table.Row key={itemRow.toString() + index}>
                            {Object.keys(itemRow).map((cellKey: string, index: number) => (
                                <Table.Cell key={cellKey + index}>{itemRow[cellKey]}</Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table >
        </EdsProvider >
    )
}