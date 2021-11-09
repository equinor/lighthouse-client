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
    return Object.keys(headerItem).map(
        (key) => {

            if (Array.isArray(headerItem[key])) return ({
                accessor: key as keyof D,
                Header: key,
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                aggregate: 'count',
                Cell: () => {
                    return `items(${headerItem[key].length})`;
                },
                Aggregated: () => {
                    return null
                }
            })

            if (typeof headerItem[key] === "object") return ({
                accessor: key as keyof D,
                Header: key,
                aggregate: 'count',
                Cell: () => {
                    return null;
                },
                Aggregated: () => {

                    return null
                }
            })

            return ({
                accessor: key as keyof D,
                Header: key,
                minWidth: 30,
                width: 150,
                maxWidth: 400,
                aggregate: 'count',
                Aggregated: (cell) => {
                    return <>
                        {key}
                        <Count>
                            ({cell.value})
                        </Count>
                    </>;

                }
            })
        });

}

