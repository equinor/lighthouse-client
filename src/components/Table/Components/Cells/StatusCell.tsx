import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../types';

const Status = styled.div`
    width: fit-content;
    background-color: green;
    font-weight: 600;
    font-size: 13px;
    border-radius: 0.8em;
    padding: 4px;
`;

export const StatusCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellFn },
    } = props;

    const attr = useMemo(() => (cellFn ? cellFn(content) : undefined), [cellFn, content]);
    return <Status {...attr}>{content[currentKey] as string}</Status>;
};
