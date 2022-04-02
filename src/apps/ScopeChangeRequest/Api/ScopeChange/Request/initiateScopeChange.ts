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
        actualChangeHours: request.actualChangeHours,
        estimatedChangeHours: request.estimatedChangeHours,
        changeCategoryId: request.changeCategory.id,
        description: request.description,
        guesstimateDescription: request.guesstimateDescription,
        guesstimateHours: request.guesstimateHours,
        id: request.id,
        originSource: request.originSource,
        originSourceId: request.originSourceId,
        phase: request.phase,
        title: request.title,
        commissioningPackageNumbers:
            request.commissioningPackages.map((x) => x.procosysNumber) || [],
        systemIds: request.systems.map((x) => x.procosysId) || [],
        tagNumbers: request.tags.map((x) => x.procosysNumber) || [],
        documentNumbers: request.documents.map((x) => x.stidDocumentNumber) || [],
        areaCodes: [],
        disciplineCodes: [],
    };

    const payload = {
        ...scopeChange,
        setAsOpen: true,
    };

    await patchScopeChange(payload);
}
