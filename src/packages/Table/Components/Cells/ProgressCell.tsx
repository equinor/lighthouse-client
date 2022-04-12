import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../types';

interface ProgressSpanProps {
    percent: number;
}

const Progress = styled.div`
    height: 20px;
    border-radius: 5px;
    position: relative;
    text-align: center;
    line-height: 23px;
    width: 90%;
`;

const ProgressBar = styled.div<ProgressSpanProps>`
    height: 100%;
    display: block;
    color: rgb(255, 251, 251);
    position: absolute;
    width: ${(props) => props.percent + '%'};
    z-index: -1;
    background-color: hsla(118, 71%, 63%, 0.5);
    border: 2px solid #4bb748;
    border-right: ${(props) => (props.percent.toString() === '100' ? '2px solid #4bb748' : 'none')};
    border-radius: 5px;
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
