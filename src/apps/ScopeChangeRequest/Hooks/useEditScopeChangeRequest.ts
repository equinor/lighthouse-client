import { patchScopeChange } from '../Api/ScopeChange/Request';
import { TypedSelectOption } from '../Api/Search/searchType';
import { ScopeChangeFormModel } from '../Components/Form/useScopeChangeFormState';
import { ProcoSysTypes } from '../Types/ProCoSys/ProCoSysTypes';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { StidTypes } from '../Types/STID/STIDTypes';

interface OnSubmitParams {
    references: TypedSelectOption[];
    request: ScopeChangeRequest;
    model: Partial<ScopeChangeFormModel>;
}

export function useEditScopeChangeRequest(): (args: OnSubmitParams) => Promise<void> {
    const onSubmit = async ({ references, request, model }: OnSubmitParams) => {
        const tags = filterElementsByType(references, 'tag');
        const systems = filterElementsByType(references, 'system');
        const commPkgs = filterElementsByType(references, 'commpkg');
        const areas = filterElementsByType(references, 'area');
        const disciplines = filterElementsByType(references, 'discipline');
        const documents = filterElementsByType(references, 'document');

        await patchScopeChange({
            ...request,
            ...model,
            changeCategoryId: model.changeCategory?.id ?? request.changeCategory.id,
            originSourceId: request.originSourceId,
            tagNumbers: tags?.map((x) => x.value) || [],
            systemIds: systems?.map((x) => Number(x.value)) || [],
            commissioningPackageNumbers: commPkgs?.map((x) => x.value) || [],
            documentNumbers: documents?.map((x) => x.value) || [],
            areaCodes: areas?.map((x) => x.value) || [],
            disciplineCodes: disciplines?.map((x) => x.value) || [],
        });
    };

    return onSubmit;
}

function filterElementsByType(items: TypedSelectOption[], type: ProcoSysTypes | StidTypes) {
    return items.filter((x) => x.type === type);
}
