import { Button, Progress } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import { patchScopeChange, uploadAttachment } from '../../Api/ScopeChange/Request';
import { ServerError } from '../../Api/ScopeChange/Types/ServerError';
import { ProcoSysTypes } from '../../Api/Search/PCS';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { StidTypes } from '../../Api/Search/STID/searchStid';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { Upload } from '../Attachments/Upload';
import { Origin } from './Origin';
import { MutationKeys } from '../../Api/ScopeChange/mutationKeys';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    close,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const [attachments, setAttachments] = useState<File[]>([]);
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);

    useEffect(() => {
        unpackRelatedObjects(request, setRelatedObjects);
    }, [request]);

    const { setErrorMessage } = useScopeChangeContext();

    const formData = useForm(scopeChangeRequestSchema, {
        id: request.id,
        phase: request.phase,
        category: request.category,
        description: request.description,
        guesstimateDescription: request.guesstimateDescription ?? undefined,
        guesstimateHours: request.guesstimateHours ?? undefined,
        title: request.title,
        originSource: request.originSource,
        originSourceId: request.originSourceId,
    });

    const onSubmit = async () => {
        const tags = filterElementsByType(relatedObjects, 'tag');
        const systems = filterElementsByType(relatedObjects, 'system');
        const commPkgs = filterElementsByType(relatedObjects, 'commpkg');
        const areas = filterElementsByType(relatedObjects, 'area');
        const disciplines = filterElementsByType(relatedObjects, 'discipline');
        const documents = filterElementsByType(relatedObjects, 'document');

        await patchScopeChange({
            ...request,
            ...formData.getChangedData(),
            tagNumbers: tags?.map((x) => x.value) || [],
            systemIds: systems?.map((x) => Number(x.value)) || [],
            commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
            documentNumbers: documents.map((x) => x.value) || [],
            areaCodes: areas.map((x) => x.value) || [],
            disciplineCodes: disciplines.map((x) => x.value) || [],
        });

        attachments.forEach(async (attachment) => {
            await uploadAttachment({ requestId: request.id, file: attachment });
        });

        if (!error) close();
    };

    const { isLoading, error, mutateAsync } = useScopeChangeMutation(
        [MutationKeys.ScopeChange],
        onSubmit,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    const SaveButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={async () => await mutateAsync()}>
                {isLoading ? <Progress.Dots color="primary" /> : <span>Save</span>}
            </Button>
        );
    };

    const CancelButton = () => {
        return (
            <Button variant="outlined" color="danger" onClick={close}>
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
                    {
                        Component: RelatedObjectsSearch,
                        order: 6,
                        title: 'References',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                <h3>Attachments</h3>
                <Upload attachments={attachments} setAttachments={setAttachments} />
            </GeneratedForm>
        </>
    );
};

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}

function unpackRelatedObjects(
    request: ScopeChangeRequest,
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>
) {
    const relations: TypedSelectOption[] = [];

    request.commissioningPackages.forEach((x) =>
        relations.push({
            label: `${x.procosysNumber}`,
            value: x.procosysNumber,
            object: x,
            searchValue: x.procosysNumber,
            type: 'commpkg',
        })
    );

    request.systems.forEach((x) =>
        relations.push({
            label: `${x.procosysCode}`,
            value: x.procosysId.toString(),
            object: x,
            searchValue: x.procosysCode,
            type: 'system',
        })
    );

    request.tags.forEach((x) =>
        relations.push({
            label: `${x.procosysNumber}`,
            value: x.procosysNumber,
            object: x,
            searchValue: x.procosysNumber,
            type: 'tag',
        })
    );

    request.documents.forEach((x) =>
        relations.push({
            label: `${x.stidDocumentNumber}`,
            value: x.stidDocumentNumber,
            object: x,
            searchValue: x.stidDocumentNumber,
            type: 'document',
        })
    );

    request.areas.forEach((x) =>
        relations.push({
            label: x.procosysCode,
            value: x.procosysCode,
            object: x,
            searchValue: x.procosysCode,
            type: 'area',
        })
    );

    request.disciplines.forEach((x) =>
        relations.push({
            label: x.procosysCode,
            value: x.procosysCode,
            object: x,
            searchValue: x.procosysCode,
            type: 'discipline',
        })
    );
    setRelatedObjects(relations);
}
