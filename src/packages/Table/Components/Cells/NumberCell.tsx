import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../Types/types';

const Container = styled.div`
    text-align: end;
    font-variant-numeric: tabular-nums;
`;

export const NumberCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn]
    );
    return <Container {...attr}>{content[currentKey] as number}</Container>;
};
