import { Button } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect } from 'react';
import { patchScopeChange } from '../../Api/ScopeChange/patchScopeChange';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Origin } from './Origin';

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

    useEffect(() => {
        formData.fields.originSourceId?.setValue(undefined);
    }, [formData.fields.originSource?.value]);

    return (
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

                // {
                //     Component: PCSLink,
                //     order: 6,
                //     title: 'References',
                //     props: {
                //         relatedObjects: relatedObjects,
                //         setRelatedObjects: setRelatedObjects,
                //     },
                // },
            ]}
        >
            {/* <Inline>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Documents</div>
                <StidSelector appendDocuments={appendDocuments} documents={stidDocuments} />
            </Inline>
            {stidDocuments &&
                stidDocuments.map((x) => {
                    return (
                        <Chip key={x.docNo}>
                            <StidDocument document={x} />

                            <Button
                                variant="ghost_icon"
                                onClick={() => {
                                    removeDocument(x.docNo);
                                }}
                            >
                                <Icon
                                    color={tokens.colors.interactive.primary__resting.rgba}
                                    name="clear"
                                />
                            </Button>
                        </Chip>
                    );
                })}

            <Field
                label="Attachments"
                value={<Upload attachments={attachments} setAttachments={setAttachments} />}
            /> */}
        </GeneratedForm>
    );
};
