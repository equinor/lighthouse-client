import { useMutation, useQueryClient } from 'react-query';
import { TypedSelectOption } from '../Api/Search/searchType';
import { ScopeChangeFormModel } from '../Components/Form/useScopeChangeFormState';
import { ProcoSysTypes } from '../Types/ProCoSys/ProCoSysTypes';
import { StidTypes } from '../Types/STID/STIDTypes';
import { postScopeChange, uploadAttachment } from '../Api/ScopeChange/Request';
import { useHttpClient } from '../../../Core/Client/Hooks';
import { scopeChangeQueryKeys } from '../Keys/scopeChangeQueryKeys';
import { ScopeChangeRequestFormModel } from '../Types/scopeChangeRequest';

interface CreateScopeChangeParams {
    draft: boolean;
    references: TypedSelectOption[];
    model: Partial<ScopeChangeFormModel>;
}

interface CreateScopeChangeRequest {
    createScopeChangeMutation: ({
        draft,
        model,
        references,
    }: CreateScopeChangeParams) => Promise<string | undefined>;
}

/**
 * Hook for creating a scope change request
 * @returns
 */
export function useCreateScopeChangeRequest(): CreateScopeChangeRequest {
    const queryClient = useQueryClient();
    const { scopeChange } = useHttpClient();

    const { mutate: uploadAttachmentMutation } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });

    const createScopeChangeMutation = async ({
        draft,
        model,
        references,
    }: CreateScopeChangeParams) => {
        const tags = filterElementsByType(references, 'tag');
        const systems = filterElementsByType(references, 'system');
        const commPkgs = filterElementsByType(references, 'commpkg');
        const areas = filterElementsByType(references, 'area');
        const disciplines = filterElementsByType(references, 'discipline');
        const documents = filterElementsByType(references, 'document');

        const validatedModel = model as ScopeChangeRequestFormModel;
        const scID = await postScopeChange(
            {
                ...validatedModel,
                changeCategoryId: model.changeCategory?.id ?? '',
                tagNumbers: tags?.map((x) => x.value) || [],
                systemIds: systems?.map((x) => Number(x.value)) || [],
                commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
                documentNumbers: documents?.map((x) => x.value) || [],
                areaCodes: areas?.map((x) => x.value) || [],
                disciplineCodes: disciplines?.map((x) => x.value) || [],
            },
            draft,
            scopeChange
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

    return { createScopeChangeMutation };
}

function filterElementsByType(items: TypedSelectOption[], itemType: ProcoSysTypes | StidTypes) {
    return items.filter(({ type }) => type === itemType);
}
