import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../types';

interface ProgressSpanProps {
    percent: number;
}

const Progress = styled.div`
    height: 23px;
    border-radius: 5px;
    border: 1px solid black;
    position: relative;
    text-align: center;
    line-height: 23px;
`;

const ProgressBar = styled.div`
    height: 100%;
    display: block;
    color: rgb(255, 251, 251);
    position: absolute;
    width: ${({ percent }: ProgressSpanProps) => percent + '%'};
    z-index: -1;
    background-color: ${({ percent }: ProgressSpanProps) =>
        percent <= 33 ? 'red' : percent <= 66 ? 'orange' : 'green'};
`;

export const ProgressCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn, content]
    );
    return (
        <Progress {...attr}>
            <ProgressBar percent={content[currentKey] as number}></ProgressBar>
            {content[currentKey] as string}%
        </Progress>
    );
};
