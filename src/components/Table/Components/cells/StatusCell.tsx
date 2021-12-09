import { CellProps } from 'react-table';
import styled from 'styled-components';
import { TableData } from '../../types';

const Status = styled.div`
    background-color: green;
    width: fit-content;
    font-weight: 600;
    border-radius: 1em;
    padding: 4px;
`;

export const StatusCell = <T extends TableData>(
    props: CellProps<T, { content: T; currentKey: string }>
) => {
    const {
        value: { content, currentKey },
    } = props;
    return <Status>{content[currentKey] as string}</Status>;
};
