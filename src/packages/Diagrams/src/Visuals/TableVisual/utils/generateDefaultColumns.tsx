import { useMemo } from "react";
import styled from "styled-components";

export interface HeaderData {
    key: string;
    title: string;
}


const Count = styled.span`
    font-size: 12px;
    padding-left: 0.5rem;
`


export function generateDefaultColumns<D extends Object = {}>(
    headerItem?: D
) {
    if (!headerItem) return [];
    const filteredHeaderItem = Object.keys(headerItem).filter((key) => {
        if (Array.isArray(headerItem[key]) || typeof headerItem[key] === "object") return false;
        return true;
    })
    return filteredHeaderItem.map(
        (key) => {

            // if (Array.isArray(headerItem[key])) return
            // ({
            //     accessor: key as keyof D,
            //     Header: key,
            //     minWidth: 30,
            //     // width: 150,
            //     maxWidth: 100,
            //     aggregate: 'count',
            //     Cell: () => {
            //         return `items(${headerItem[key].length})`;
            //     },
            //     Aggregated: () => {
            //         return null
            //     },

            // })

            // if (typeof headerItem[key] === "object") return ({
            //     accessor: key as keyof D,
            //     Header: key,
            //     aggregate: 'count',
            //     Cell: () => {
            //         return null;
            //     },
            //     Aggregated: () => {

            //         return null
            //     },

            // })

            return ({
                accessor: key as keyof D,
                Header: key,
                minWidth: 30,
                // width: 150,
                maxWidth: 100,
                aggregate: 'uniqueCount',
                Aggregated: (cell) => {
                    // console.log(cell)
                    return <>
                        {cell.value}
                        {/* <Count>
                            ({cell.value})
                        </Count> */}
                    </>;
                },
                Footer: data => {
                    // Only calculate total visits if rows change
                    const total = useMemo(
                        () =>
                            data.rows.reduce((sum, row) => row.values[key] + sum, 0),
                        [data.rows]
                    )

                    if (data.state.groupBy.includes(key)) {
                        return <div>Total: </div>
                    }
                    return <div>{total}</div>
                },
            })
        });

}

