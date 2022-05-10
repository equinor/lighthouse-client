import { patchScopeChange } from './patchScopeChange';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../../types/scopeChangeRequest';

/**
 *
 * @param request
 */

interface InitiateScopeChangeParams {
    request: ScopeChangeRequest;
}

export async function initiateScopeChange({ request }: InitiateScopeChangeParams): Promise<void> {
    const scopeChange: ScopeChangeRequestFormModel = {
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
        originSource: request.originSource,
        originSourceId: request.originSourceId,
        phase: request.phase,
        title: request.title,
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
