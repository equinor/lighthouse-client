import { HTMLAttributes, useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../Types';
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
    font-weight: 400;
    font-size: 13px;
`;
const Status = styled.div`
    background-color: green;
    height: 12px;
    width: 12px;
    border-radius: 50%;
`;

const StatusCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn, content]
    );
    return (
        <Wrapper>
            <Status {...attr}></Status>
            {content[currentKey] as string}
        </Wrapper>
    );
};
type StatusCustomCellProps<T extends string | number | boolean | null> = {
    contentToBeDisplayed: T;
    cellAttributeFunction?: (content: T) => HTMLAttributes<HTMLElement>;
};
const StatusCustomCell = <T extends string | number | boolean | null>({
    contentToBeDisplayed,
    cellAttributeFunction,
}: StatusCustomCellProps<T>) => {
    const attr = cellAttributeFunction ? cellAttributeFunction(contentToBeDisplayed) : undefined;
    return (
        <Wrapper>
            <Status {...attr}></Status>
            {contentToBeDisplayed}
        </Wrapper>
    );
};

export { StatusCell, StatusCustomCell };
