import { Button, Icon, Progress } from '@equinor/eds-core-react';
import { useEffect } from 'react';
import { patchScopeChange } from '../../Api/ScopeChange/Request';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { RelatedObjectsSearch } from '../SearchableDropdown/RelatedObjectsSearch/RelatedObjectsSearch';
import { HotUpload } from '../Attachments/HotUpload';
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
import { useFacility } from '../../../../Core/Client/Hooks';
import { ScopeChangeBaseForm } from './ScopeChangeBaseForm';
import { useScopeChangeFormState } from './useScopeChangeFormState';
import {
    ActionBar,
    AttachmentName,
    AttachmentsList,
    ButtonContainer,
    FlexColumn,
    FormWrapper,
    Inline,
    Section,
} from './ScopeChangeForm.styles';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    close,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
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
        unpackRelatedObjects(
            request,
            procosysPlantId,
            state.references ?? [],
            handleReferencesChanged,
            { ...referencesKeys, ...stid },
            addToQueryCache
        );
    }, [request]);

    useEffect(() => {
        return () => close();
    }, [request.id]);

    const onSubmit = async () => {
        const tags = state.references && filterElementsByType(state.references, 'tag');
        const systems = state.references && filterElementsByType(state.references, 'system');
        const commPkgs = state.references && filterElementsByType(state.references, 'commpkg');
        const areas = state.references && filterElementsByType(state.references, 'area');
        const disciplines =
            state.references && filterElementsByType(state.references, 'discipline');
        const documents = state.references && filterElementsByType(state.references, 'document');

        await patchScopeChange({
            ...request,
            ...state,
            originSourceId: request.originSourceId,
            tagNumbers: tags?.map((x) => x.value) || [],
            systemIds: systems?.map((x) => Number(x.value)) || [],
            commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
            documentNumbers: documents?.map((x) => x.value) || [],
            areaCodes: areas?.map((x) => x.value) || [],
            disciplineCodes: disciplines?.map((x) => x.value) || [],
        });

        if (!error) close();
    };

    const { isLoading, error, mutate } = useScopeChangeMutation(request.id, patchKey, onSubmit);

    const { handleInput, isValid, state } = useScopeChangeFormState({
        ...request,
        attachments: [],
    });

    const handleReferencesChanged = (references: TypedSelectOption[]) =>
        handleInput('references', references);

    return (
        <>
            <FormWrapper>
                <FlexColumn>
                    Request
                    <ScopeChangeBaseForm handleInput={handleInput} state={state} />
                </FlexColumn>

                <FlexColumn>
                    <Section>
                        <RelatedObjectsSearch
                            handleReferencesChanged={handleReferencesChanged}
                            references={state.references ?? []}
                        />
                    </Section>
                    Attachments
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
                </FlexColumn>
            </FormWrapper>
            <ActionBar>
                <ButtonContainer>
                    {isLoading ? (
                        <Button disabled={true}>
                            <Progress.Dots color="primary" />
                        </Button>
                    ) : (
                        <>
                            <Button disabled={!isValid} onClick={() => mutate()}>
                                {isLoading ? <Progress.Dots color="primary" /> : 'Save'}
                            </Button>
                        </>
                    )}
                </ButtonContainer>
            </ActionBar>
        </>
    );
};

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}

async function unpackRelatedObjects(
    request: ScopeChangeRequest,
    plantId: string,
    references: TypedSelectOption[],
    handleReferencesChanged: (references: TypedSelectOption[]) => void,
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
    function updateReferences(x: TypedSelectOption) {
        const index = references.findIndex(({ value }) => value === x.value);
        if (index === -1) {
            handleReferencesChanged([...references, x]);
            return;
        }

        handleReferencesChanged([...references.slice(0, index), x, ...references.slice(index + 1)]);
    }

    const appendRelatedObjects = (x: TypedSelectOption) =>
        handleReferencesChanged([...references, x]);

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
            getCommPkgById(plantId, x.procosysId)
        );

        updateReferences({
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
            getTagById(plantId, x.procosysId)
        );

        updateReferences({
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

        updateReferences({
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
            getAreaByCode(plantId, x.procosysCode)
        );

        updateReferences({
            ...areaSelectOption,
            label: `${x.procosysCode} ${area.Description}`,
            object: area,
        });
    });

    const disciplines = await addToQueryCache(referencesKeys.disciplines, () =>
        getDisciplines(plantId)
    );
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

        updateReferences({
            ...disciplineSelectOption,
            label: `${x.procosysCode} ${match?.Description}`,
            object: match,
        });
    });

    const systems = await addToQueryCache(referencesKeys.systems, () => getSystems(plantId));
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

        updateReferences({
            ...systemSelectOption,
            label: `${x.procosysCode} ${system?.Description}`,
            object: system,
        });
    });
}
