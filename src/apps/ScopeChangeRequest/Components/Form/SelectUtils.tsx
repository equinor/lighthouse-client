import { TypedSelectOption } from '../../Api/Search/searchType';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../Types/scopeChangeRequest';
import { StidTypes } from '../../Types/STID/STIDTypes';

export function filterElementsByType(
    items: TypedSelectOption[],
    type: ProcoSysTypes | StidTypes
): TypedSelectOption[] {
    return items.filter((x) => x.type === type);
}

export function mergeRelatedObjects(
    relatedObjects: TypedSelectOption[],
    data: ScopeChangeRequest
): ScopeChangeRequestFormModel {
    return {
        ...data,
        tagNumbers: filterElementsByType(relatedObjects, 'tag').map(({ value }) => value),
        areaCodes: filterElementsByType(relatedObjects, 'area').map(({ value }) => value),
        disciplineCodes: filterElementsByType(relatedObjects, 'discipline').map(
            ({ value }) => value
        ),
        commissioningPackageNumbers: filterElementsByType(relatedObjects, 'commpkg').map(
            ({ value }) => value
        ),
        documentNumbers: filterElementsByType(relatedObjects, 'document').map(({ value }) => value),
        systemIds: filterElementsByType(relatedObjects, 'system').map(({ value }) => Number(value)),
    };
}
