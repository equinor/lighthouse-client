import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../types';

const Description = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const DescriptionCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellFn },
    } = props;

    const attr = useMemo(() => (cellFn ? cellFn(content) : undefined), [cellFn]);
    return <Description {...attr}>{content[currentKey] as string}</Description>;
};
