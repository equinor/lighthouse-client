import { patchReleaseControl, postReleaseControl } from '../api/releaseControl/Request';
import { DRCFormModel } from '../Atoms/formAtomApi';

interface EditReleaseControlParams {
    model: DRCFormModel;
    setAsOpen?: boolean;
}

interface CreateReleaseControlParams {
    draft: boolean;
    model: DRCFormModel;
}

interface RequestMutations {
    editReleaseControlMutation: ({ model, setAsOpen }: EditReleaseControlParams) => Promise<void>;
    createReleaseControlMutation: ({
        draft,
        model,
    }: CreateReleaseControlParams) => Promise<string | undefined>;
}

export function useRequestMutations(): RequestMutations {
    const editReleaseControlMutation = async ({ model, setAsOpen }: EditReleaseControlParams) => {
        await patchReleaseControl(model, setAsOpen);
    };

    const createReleaseControlMutation = async ({ draft, model }: CreateReleaseControlParams) => {
        const validatedModel = model as DRCFormModel;
        const rcID = await postReleaseControl(
            {
                ...validatedModel,
            },
            draft
        );
        return rcID;
    };
    return {
        createReleaseControlMutation,
        editReleaseControlMutation,
    };
}
