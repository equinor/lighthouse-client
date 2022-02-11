import { Button, Progress } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import { patchScopeChange, uploadAttachment } from '../../Api/ScopeChange/Request';
import { ServerError } from '../../Api/ScopeChange/Types/ServerError';
import { useScopeChangeMutation } from '../../Hooks/useScopechangeMutation';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Field } from '../DetailView/Components/Field';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { Upload } from '../Upload';
import { Origin } from './Origin';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    cancel: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    cancel,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const [attachments, setAttachments] = useState<File[]>([]);

    const { setErrorMessage } = useScopeChangeContext();

    const formData = useForm(scopeChangeRequestSchema, {
        id: request.id,
        phase: request.phase,
        description: request.description,
        guesstimateDescription: request.guesstimateDescription ?? undefined,
        guesstimateHours: request.guesstimateHours ?? undefined,
        title: request.title,
        originSource: request.originSource,
        originSourceId: request.originSourceId,
    });

    const onSubmit = async () => {
        await patchScopeChange({
            ...request,
            ...formData.getChangedData(),
            tagNumbers: request.tags.map((x) => x.procosysNumber) || [],
            systemIds: request.systems.map((x) => Number(x.procosysCode)) || [],
            commissioningPackageNumbers:
                request.commissioningPackages.map((x) => x.procosysNumber) || [],
            areaCodes: [],
            disciplineCodes: [],
            documentNumbers: request.documents.map((x) => x.id) || [],
        });

        attachments.forEach(async (attachment) => {
            await uploadAttachment({ requestId: request.id, file: attachment });
        });

        if (!error) cancel();
    };

    const { isLoading, error, mutateAsync } = useScopeChangeMutation(onSubmit, {
        onError: (e: ServerError) => setErrorMessage(e),
    });

    const SaveButton = () => {
        return (
            <Button onClick={async () => await mutateAsync()}>
                {isLoading ? <Progress.Dots color="primary" /> : <span>Save</span>}
            </Button>
        );
    };

    const CancelButton = () => {
        return (
            <Button variant="outlined" color="danger" onClick={cancel}>
                Cancel
            </Button>
        );
    };

    useEffect(() => {
        formData.fields.originSourceId?.setValue(undefined);
    }, [formData.fields.originSource?.value]);

    return (
        <>
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[CancelButton, SaveButton]}
                customFields={[
                    {
                        Component: Origin,
                        order: 3,
                        title: '',
                        props: {
                            originSource: formData.fields.originSource,
                            originId: formData.fields.originSourceId,
                        },
                    },
                ]}
            >
                <Field
                    label="Attachments"
                    value={<Upload attachments={attachments} setAttachments={setAttachments} />}
                />
            </GeneratedForm>
        </>
    );
};
