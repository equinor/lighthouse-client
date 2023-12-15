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
Main system: 
Scaffolding [Yes/No]: 
Valve insulationbox, remove lid only [Yes/No]: 
SAP AO number (if applicable): 

Description: 
`;
