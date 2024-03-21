import { useMemo } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../Types/types';

export const DateCell = <T extends TableData>(
  props: CellProps<T, CellRenderProps<T>>
): JSX.Element => {
  const {
    value: { content, currentKey, cellAttributeFn },
  } = props;

  const attr = useMemo(
    () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
    [cellAttributeFn]
  );

  const dateDisplay = content[currentKey]
    ? new Date(content[currentKey] as string).toLocaleDateString()
    : '';
  return <div {...attr}>{dateDisplay}</div>;
};

export const CustomDateCell = ({
  dateString,
}: {
  dateString: string | null | undefined;
}): JSX.Element => {
  if (!dateString || typeof dateString !== 'string') return <div>No date</div>;

  return <div>{new Date(dateString).toLocaleDateString('EN-GB')}</div>;
};
