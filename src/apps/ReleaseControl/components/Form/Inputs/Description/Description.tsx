import { TextField } from '@equinor/eds-core-react';
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

const descriptionDefaultInput = `Requested by: 
Area:
System:
Scaffolding [Yes/No], describe:
Valve insulation box, remove lid only [Yes/No], describe:
SAP AO number (if applicable):
PTW number(if applicable):
Safety Critical HT involved?:
Ideal start date:
Required finish date:

Description of what is to be done (use the suggested wording below - if your not sure what to input for HT / other, just say not sure):

1.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
2.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
3.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
4.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
5.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
6.TAG:      HT:     Insu Tag:       What are you doing?:        P&ID:   HT-ISO:
`;
