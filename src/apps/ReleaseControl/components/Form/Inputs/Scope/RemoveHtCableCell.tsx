import { ClickableIcon } from '@equinor/lighthouse-components';
import { CellProps } from '@equinor/Table';
import { TypedSelectOption } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { useAtomState, updateAtom } = DRCFormAtomApi;

const removeHtCable = (htCables: TypedSelectOption[], tagNo: string) => {
  updateAtom({ htCables: htCables.filter((x) => x.value !== tagNo) });
};

export const RemoveHtCableCell = ({ value }: CellProps<any, any>): JSX.Element => {
  const htCables = useAtomState((s) => s.htCables) ?? [];
  return (
    <ClickableIcon name="close" onClick={() => removeHtCable(htCables, (value as any).tagNo)} />
  );
};
