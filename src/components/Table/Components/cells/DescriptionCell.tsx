import { CellProps } from 'react-table';
import styled from 'styled-components';
import { TableData } from '../../types';

const Description = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const DescriptionCell = <T extends TableData>(
    props: CellProps<T, { content: T; currentKey: string }>
) => {
    const {
        value: { content, currentKey },
    } = props;
    return <Description>{content[currentKey] as string}</Description>;
};
