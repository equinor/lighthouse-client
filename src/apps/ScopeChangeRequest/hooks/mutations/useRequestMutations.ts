import { useMutation, useQueryClient } from 'react-query';
import { patchScopeChange, postScopeChange, uploadAttachment } from '../../api/ScopeChange/Request';
import { TypedSelectOption } from '../../api/Search/searchType';
import { ScopeChangeFormModel } from '../form/useScopeChangeFormState';
import { scopeChangeQueryKeys } from '../../keys/scopeChangeQueryKeys';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../types/scopeChangeRequest';

interface EditScopeChangeParams {
    references: TypedSelectOption[];
    request: ScopeChangeRequest;
    model: Partial<ScopeChangeFormModel>;
    setAsOpen?: boolean;
}

interface CreateScopeChangeParams {
    draft: boolean;
    references: TypedSelectOption[];
    model: Partial<ScopeChangeFormModel>;
}

interface RequestMutations {
    editScopeChangeMutation: ({
        references,
        request,
        model,
        setAsOpen,
    }: EditScopeChangeParams) => Promise<void>;
    createScopeChangeMutation: ({
        draft,
        model,
        references,
    }: CreateScopeChangeParams) => Promise<string | undefined>;
}

export function useRequestMutations(): RequestMutations {
    const { mutate: uploadAttachmentMutation } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });
    const queryClient = useQueryClient();

    const editScopeChangeMutation = async ({
        references,
        request,
        model,
        setAsOpen,
    }: EditScopeChangeParams) => {
        await patchScopeChange(
            {
                ...request,
                ...model,
                ...(extractReferences(references) as ScopeChangeRequestFormModel),
                changeCategoryId: model.changeCategory?.id ?? request.changeCategory.id,
            },
            setAsOpen
        );
    };

    const createScopeChangeMutation = async ({
        draft,
        model,
        references,
    }: CreateScopeChangeParams) => {
        const validatedModel = model as ScopeChangeRequestFormModel;
        const scID = await postScopeChange(
            {
                ...validatedModel,
                changeCategoryId: model.changeCategory?.id ?? '',
                ...extractReferences(references),
            },
            draft
        );
        if (scID) {
            const { baseKey } = scopeChangeQueryKeys(scID);
            model?.attachments?.forEach(async (attachment) => {
                uploadAttachmentMutation({ file: attachment, requestId: scID });
            });

            queryClient.invalidateQueries(baseKey);
            return scID;
        }
    };
    return {
        createScopeChangeMutation,
        editScopeChangeMutation,
    };
}

function filterElementsByType(items: TypedSelectOption[], itemType: string) {
    return items.filter(({ type }) => type === itemType);
}

function extractReferences(references: TypedSelectOption[]): Partial<ScopeChangeRequestFormModel> {
    const tags = filterElementsByType(references, 'tag');
    const systems = filterElementsByType(references, 'system');
    const commPkgs = filterElementsByType(references, 'commpkg');
    const areas = filterElementsByType(references, 'area');
    const disciplines = filterElementsByType(references, 'discipline');
    const documents = filterElementsByType(references, 'document');

    return {
        tagNumbers: tags?.map((x) => x.value) || [],
        systemIds: systems?.map((x) => Number(x.value)) || [],
        commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
        documentNumbers: documents?.map((x) => x.value) || [],
        areaCodes: areas?.map((x) => x.value) || [],
        disciplineCodes: disciplines?.map((x) => x.value) || [],
    };
}
