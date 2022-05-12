import { useMutation, useQueryClient } from 'react-query';
import { patchScopeChange, postScopeChange, uploadAttachment } from '../../api/ScopeChange/Request';
import { scopeChangeQueryKeys } from '../../keys/scopeChangeQueryKeys';
import { ScopeChangeCreateEditModel } from '../../types/scopeChangeRequest';

interface EditScopeChangeParams {
    model: ScopeChangeCreateEditModel;
    setAsOpen?: boolean;
}

interface CreateScopeChangeParams {
    draft: boolean;
    model: ScopeChangeCreateEditModel;
}

interface RequestMutations {
    editScopeChangeMutation: ({ model, setAsOpen }: EditScopeChangeParams) => Promise<void>;
    createScopeChangeMutation: ({
        draft,
        model,
    }: CreateScopeChangeParams) => Promise<string | undefined>;
}

export function useRequestMutations(): RequestMutations {
    const { mutate: uploadAttachmentMutation } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });
    const queryClient = useQueryClient();

    const editScopeChangeMutation = async ({ model, setAsOpen }: EditScopeChangeParams) => {
        await patchScopeChange(model, setAsOpen);
    };

    const createScopeChangeMutation = async ({ draft, model }: CreateScopeChangeParams) => {
        const validatedModel = model as ScopeChangeCreateEditModel;
        const scID = await postScopeChange(
            {
                ...validatedModel,
                changeCategoryId: model.changeCategory?.id ?? '',
            },
            draft
        );

        if (scID) {
            const { baseKey } = scopeChangeQueryKeys(scID);
            model?.newAttachments?.forEach(async (attachment) => {
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
