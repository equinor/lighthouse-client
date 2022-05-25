import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../Types/types';

const Description = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const DescriptionCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn]
    );

    return (
        <Description {...attr} title={content?.[currentKey] as string}>
            {content?.[currentKey] as string}
        </Description>
    );
};
