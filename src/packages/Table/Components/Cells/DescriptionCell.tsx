import { useMemo } from 'react';
import { CellProps } from 'react-table';
import styled from 'styled-components';
import { CellRenderProps, TableData } from '../../Types/types';

const Description = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DescriptionCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
  const {
    value: { content, currentKey, cellAttributeFn },
  } = props;

  const attr = useMemo(
    () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
    [cellAttributeFn]
  );
  if (content?.[currentKey] === (null || undefined)) {
    return null;
  }
  return (
    <Description {...attr} title={content?.[currentKey] as string}>
      {content?.[currentKey] as string}
    </Description>
  );
};
type CustomDescriptionCellProps = {
  description: string | null;
};
const CustomDescriptionCell = ({ description }: CustomDescriptionCellProps) => {
  return <Description title={description || ''}>{description}</Description>;
};

export { CustomDescriptionCell, DescriptionCell };
