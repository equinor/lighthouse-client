import { TextField } from '@equinor/eds-core-react-old';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;
const updateDescription = (e) => {
  updateAtom({ description: e.target.value });
};
export const DescriptionInput = (): JSX.Element => {
  const description = useAtomState((s) => s.description);

  return (
    <TextField
      id={(Math.random() * 16).toString()}
      label="Scope description. Why is this job needed, what is the size of the scope?"
      multiline
      rows={11}
      placeholder="Why is this job needed, what is the size of the scope?"
      value={description}
      onChange={updateDescription}
      meta={'(Required)'}
      defaultValue={descriptionDefaultInput}
    />
  );
};

const descriptionDefaultInput = `--- Required inputs ---
Requested by: 
Scaffolding [Yes/No]: 
--- Optional Inputs (if applicable) ---
SAP AO number: 
PTW number: 
Safety Critical HT involved: 

Description of what is to be done (use the suggested wording below - if your not sure what to input for HT / other, just say not sure): 

(Example)
1.TAG:    HT:      Insu-Tag:       Job description: 
2.TAG:    HT:      Insu-Tag:       Job description: 
`;
