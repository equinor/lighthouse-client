import { Button } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { patchScopeChange } from '../../Api/patchScopeChange';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    cancel: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    cancel,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const formData = useForm(scopeChangeRequestSchema, request);

    const onSubmit = async () => {
        patchScopeChange(formData.data);
    };

    const SaveButton = () => {
        return <Button onClick={onSubmit}>Save</Button>;
    };

    const CancelButton = () => {
        return (
            <Button variant="outlined" color="danger" onClick={cancel}>
                Cancel
            </Button>
        );
    };

    return (
        <GeneratedForm formData={formData} editMode={true} buttons={[CancelButton, SaveButton]} />
    );
};
