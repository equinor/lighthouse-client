import { TypedSelectOption } from '@equinor/Workflow';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { SearchHtCables } from './SearchHtCables';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateHtCables = (newVals: TypedSelectOption[]) => {
  updateAtom({ htCables: newVals });
};

export const HtCablesInput = (): JSX.Element => {
  const htCables = useAtomState((s) => s.htCables) ?? [];

  return <SearchHtCables onChange={updateHtCables} htCables={htCables} />;
};
