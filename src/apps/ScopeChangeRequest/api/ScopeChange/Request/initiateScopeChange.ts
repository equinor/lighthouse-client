import { patchScopeChange } from './patchScopeChange';
import { ScopeChangeRequest, ScopeChangeCreateEditModel } from '../../../types/scopeChangeRequest';

/**
 *
 * @param request
 */

interface InitiateScopeChangeParams {
    request: ScopeChangeRequest;
}

export async function initiateScopeChange({ request }: InitiateScopeChangeParams): Promise<void> {
    const scopeChange: ScopeChangeCreateEditModel = {
        ...request,
        changeCategoryId: request.changeCategory.id,
        description: request.description,
        disciplineGuesstimates: request.disciplineGuesstimates.map(
            ({ discipline: { procosysCode }, guesstimate }) => ({
                disciplineCode: procosysCode,
                guesstimateHours: guesstimate,
            })
        ),
        id: request.id,
        scopeId: request.scope.id,
        originSource: request.originSource,
        originSourceId: request.originSourceId,
        phase: request.phase,
        title: request.title,
        punchListIds: request.punchListItems.map(({ procosysId }) => procosysId) || [],
        commissioningPackageNumbers:
            request.commissioningPackages.map(({ procosysNumber }) => procosysNumber) || [],
        systemIds: request.systems.map(({ procosysId }) => procosysId) || [],
        tagNumbers: request.tags.map(({ procosysNumber }) => procosysNumber) || [],
        documentNumbers:
            request.documents.map(({ stidDocumentNumber }) => stidDocumentNumber) || [],
        areaCodes: [],
    };

    const payload = {
        ...scopeChange,
        setAsOpen: true,
    };

    await patchScopeChange(payload);
}
