import { Checkbox } from '@equinor/eds-core-react';
import { Hooks } from 'react-table';
import styled from 'styled-components';
import { TableData, Cell } from '../types';

export const Div = styled.div`
    padding: 0px;
    margin-top: -4px;

    height: 10px;
    > span {
        padding: 0px;

        > svg {
            width: 18px;
            height: 18px;
        }
    }
`;

export function useSelector<T extends TableData>(hooks: Hooks<T>): void {
    hooks.visibleColumns.push((columns) => [
        {
            id: 'selection',
            disableResizing: true,
            width: 30,
            // Header: ({ getToggleAllPageRowsSelectedProps }: UseRowSelectInstanceProps<Record<string, unknown>>): JSX.Element => (
            //     <HeaderCheckbox  {...getToggleAllPageRowsSelectedProps()} />
            // ),
            // TODO : row.original doesnt contain the property noCheckbox
            Cell: ({ row }: Cell<T>): JSX.Element => {
                return row.original?.noCheckbox ? (
                    <></>
                ) : (
                    <Div onClick={() => console.log(row)}>
                        <Checkbox
                            disabled={row.original?.disableCheckbox}
                            {...row.getToggleRowSelectedProps()}
                        />
                    </Div>
                );
            },
        },
        ...columns,
    ]);
}
