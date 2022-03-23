import { Button, Icon, Progress } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import { patchScopeChange } from '../../Api/ScopeChange/Request';
import { ServerError } from '../../Types/ScopeChange/ServerError';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { Origin } from './Origin';
import { Section, Title } from './ScopeChangeRequestForm';
import { HotUpload } from '../Attachments/HotUpload';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { deleteAttachment } from '../../Api/ScopeChange/Request/attachment';
import { useQueryCacheLookup } from '../../Hooks/React-Query/useQueryCacheLookup';
import { getCommPkgById } from '../../Api/PCS/getCommPkgById';
import { FetchQueryOptions } from 'react-query';
import { getSystems } from '../../Api/PCS/getSystems';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { getTagById } from '../../Api/PCS/getTagById';
import { getDocumentById } from '../../Api/STID/getDocumentById';
import { getAreaByCode } from '../../Api/PCS/getAreaByCode';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../../Keys/STIDQueryKeys';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    close,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const { addToQueryCache } = useQueryCacheLookup();

    const referencesKeys = proCoSysQueryKeys();
    const stid = stidQueryKeys();
    const { patchKey, deleteAttachmentKey } = scopeChangeMutationKeys(request.id);
    const { mutate: removeAttachment } = useScopeChangeMutation(
        request.id,
        deleteAttachmentKey,
        deleteAttachment
    );

    useEffect(() => {
        setRelatedObjects([]);
        unpackRelatedObjects(
            request,
            setRelatedObjects,
            { ...referencesKeys, ...stid },
            addToQueryCache
        );
    }, [request]);

    useEffect(() => {
        return () => close();
    }, [request.id]);

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
            originSourceId: request.originSourceId,
            tagNumbers: tags?.map((x) => x.value) || [],
            systemIds: systems?.map((x) => Number(x.value)) || [],
            commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
            documentNumbers: documents.map((x) => x.value) || [],
            areaCodes: areas.map((x) => x.value) || [],
            disciplineCodes: disciplines.map((x) => x.value) || [],
        });

        if (!error) close();
    };

    const { isLoading, error, mutate } = useScopeChangeMutation(request.id, patchKey, onSubmit, {
        onError: (e: ServerError) => setErrorMessage(e),
    });

    const SaveButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={() => mutate()}>
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
                        title: '',
                        props: {
                            relatedObjects: relatedObjects,
                            setRelatedObjects: setRelatedObjects,
                        },
                    },
                ]}
            >
                <Section style={{ margin: '0em 0.5em' }}>
                    <Title>Attachments</Title>
                    <HotUpload />
                    {request.attachments.map((attachment, i) => {
                        return (
                            <AttachmentsList key={i}>
                                <AttachmentName>{attachment.fileName}</AttachmentName>
                                <Inline>
                                    <div>
                                        {attachment.fileSize &&
                                            (attachment?.fileSize / 1000 ** 2).toFixed(2)}
                                        MB
                                    </div>
                                    <Icon
                                        style={{ margin: '0em 0.5em' }}
                                        color={tokens.colors.interactive.primary__resting.rgba}
                                        onClick={() =>
                                            removeAttachment({
                                                requestId: request.id,
                                                attachmentId: attachment.id,
                                            })
                                        }
                                        name="clear"
                                    />
                                </Inline>
                            </AttachmentsList>
                        );
                    })}
                </Section>
            </GeneratedForm>
        </>
    );
};

const AttachmentName = styled.a`
    color: ${tokens.colors.interactive.primary__resting.rgba};
    cursor: 'pointer';
    text-decoration: 'none';
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

const AttachmentsList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5em 0em;
    font-size: 16px;
    align-items: center;
`;

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}

async function unpackRelatedObjects(
    request: ScopeChangeRequest,
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>,
    referencesKeys: {
        baseKey: string[];
        disciplines: string[];
        systems: string[];
        document: (documentId: string) => string[];
        area: (areaId: string) => string[];
        tag: (tagId: string) => string[];
        commPkg: (commPkgId: string) => string[];
    },
    addToQueryCache: <T>(
        queryKey: string[],
        queryFn: () => Promise<T>,
        options?: FetchQueryOptions<T, unknown, T, string[]> | undefined
    ) => Promise<T>
) {
    const appendRelatedObjects = (x: TypedSelectOption) =>
        setRelatedObjects((prev) => [...prev, x]);
    const patchRelatedObjects = (x: TypedSelectOption) =>
        setRelatedObjects((prev) => {
            const index = prev.findIndex(({ value }) => value === x.value);
            if (index === -1) return [...prev, x];

            const newList = [...prev.slice(0, index), x, ...prev.slice(index + 1)];
            return newList;
        });

    request.commissioningPackages.forEach(async (x) => {
        const commPkgSelectOption: TypedSelectOption = {
            label: `${x.procosysNumber}`,
            object: x,
            searchValue: x.procosysNumber,
            type: 'commpkg',
            value: x.procosysNumber,
        };
        appendRelatedObjects(commPkgSelectOption);

        const commPkg = await addToQueryCache(referencesKeys.commPkg(x.procosysNumber), () =>
            getCommPkgById(x.procosysId)
        );

        patchRelatedObjects({
            ...commPkgSelectOption,
            label: `${x.procosysNumber} ${commPkg.Description}`,
            object: commPkg,
        });
    });

    request.tags.forEach(async (x) => {
        const tagSelectOption: TypedSelectOption = {
            label: `${x.procosysNumber}`,
            value: x.procosysNumber,
            object: x,
            searchValue: x.procosysNumber,
            type: 'tag',
        };
        appendRelatedObjects(tagSelectOption);

        const tag = await addToQueryCache(referencesKeys.tag(x.procosysNumber), () =>
            getTagById(x.procosysId)
        );

        patchRelatedObjects({
            ...tagSelectOption,
            label: `${x.procosysNumber} ${tag.Description}`,
            object: tag,
        });
    });

    //TODO: JCA injected
    request.documents.forEach(async (x) => {
        const documentSelectOption: TypedSelectOption = {
            label: `${x.stidDocumentNumber}`,
            value: x.stidDocumentNumber,
            object: x,
            searchValue: x.stidDocumentNumber,
            type: 'document',
        };
        appendRelatedObjects(documentSelectOption);

        const document = await addToQueryCache(referencesKeys.document(x.stidDocumentNumber), () =>
            getDocumentById(x.stidDocumentNumber, 'JCA')
        );

        patchRelatedObjects({
            ...documentSelectOption,
            label: `${x.stidDocumentNumber} ${document.docTitle}`,
            object: document,
        });
    });

    request.areas.forEach(async (x) => {
        const areaSelectOption: TypedSelectOption = {
            label: `${x.procosysCode}`,
            value: x.procosysCode,
            object: x,
            searchValue: x.procosysCode,
            type: 'area',
        };
        appendRelatedObjects(areaSelectOption);

        const area = await addToQueryCache(referencesKeys.area(x.procosysCode), () =>
            getAreaByCode(x.procosysCode)
        );

        patchRelatedObjects({
            ...areaSelectOption,
            label: `${x.procosysCode} ${area.Description}`,
            object: area,
        });
    });

    const disciplines = await addToQueryCache(referencesKeys.disciplines, getDisciplines);
    request.disciplines.forEach((x) => {
        const disciplineSelectOption: TypedSelectOption = {
            label: `${x.procosysCode}`,
            value: x.procosysCode,
            object: x,
            searchValue: x.procosysCode,
            type: 'discipline',
        };

        appendRelatedObjects(disciplineSelectOption);

        const match = disciplines.find((discipline) => discipline.Code === x.procosysCode);

        patchRelatedObjects({
            ...disciplineSelectOption,
            label: `${x.procosysCode} ${match?.Description}`,
            object: match,
        });
    });

    const systems = await addToQueryCache(referencesKeys.systems, getSystems);
    request.systems.forEach((x) => {
        const systemSelectOption: TypedSelectOption = {
            label: `${x.procosysCode}`,
            value: x.procosysId.toString(),
            object: x,
            searchValue: x.procosysCode,
            type: 'system',
        };

        appendRelatedObjects(systemSelectOption);

        const system = systems.find((loc) => loc.Code === x.procosysCode);

        patchRelatedObjects({
            ...systemSelectOption,
            label: `${x.procosysCode} ${system?.Description}`,
            object: system,
        });
    });
}
