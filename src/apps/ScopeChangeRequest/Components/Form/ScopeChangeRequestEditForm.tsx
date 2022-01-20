import { Button } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { patchScopeChange } from '../../Api';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    cancel: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    cancel,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const formData = useForm(scopeChangeRequestSchema, {
        id: request.id,
        phase: request.phase,
        description: request.description,
        guesstimateDescription: request.guesstimateDescription ?? undefined,
        guesstimateHours: request.guesstimateHours ?? undefined,
        title: request.title,
    });
    const { customApi } = useHttpClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');

    const onSubmit = async () => {
        await patchScopeChange(
            {
                ...request,
                ...formData.getChangedData(),
                TagNumbers: request.TagNumbers || [],
                SystemIds: request.SystemIds || [],
                CommissioningPackageNumbers: request.CommissioningPackageNumbers || [],
            },
            customApi
        );
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
        <GeneratedForm formData={formData} editMode={true} buttons={[CancelButton, SaveButton]}>
            {/* <Upload requestId={request.id} existingAttachments={request.attachments} /> */}
        </GeneratedForm>
    );
};
