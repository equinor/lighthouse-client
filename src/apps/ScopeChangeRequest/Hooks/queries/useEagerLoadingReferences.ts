import { useFacility } from '../../../../Core/Client/Hooks';
import { getAreaByCode } from '../../api/PCS/getAreaByCode';
import { getCommPkgById } from '../../api/PCS/getCommPkgById';
import { getTagById } from '../../api/PCS/getTagById';
import { getDocumentById } from '../../api/STID/getDocumentById';
import { proCoSysQueryKeys } from '../../keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../../keys/STIDQueryKeys';
import {
    ScopeChangeArea,
    ScopeChangeCommissioningPackage,
    ScopeChangeDocument,
    ScopeChangeRequest,
    ScopeChangeTag,
} from '../../types/scopeChangeRequest';
import { useEagerLoading } from '../react-Query/useEagerLoading';

export function useEagerLoadingReferences(request: ScopeChangeRequest): void {
    const { procosysPlantId } = useFacility();

    const keys = proCoSysQueryKeys();
    const { document } = stidQueryKeys();

    /** Comm pkgs */
    const keyFunction = (pkg: ScopeChangeCommissioningPackage) => keys.commPkg(pkg.procosysNumber);
    const queryFn = async (pkg: ScopeChangeCommissioningPackage) =>
        await getCommPkgById(procosysPlantId, pkg.procosysId);
    useEagerLoading({
        items: request.commissioningPackages,
        key: keyFunction,
        queryFn: queryFn,
    });

    /** AREA */
    const areaKeyFunction = (area: ScopeChangeArea) => keys.area(area.procosysCode);
    const getArea = async (area: ScopeChangeArea) =>
        await getAreaByCode(procosysPlantId, area.procosysCode);
    useEagerLoading({
        items: request.areas,
        key: areaKeyFunction,
        queryFn: getArea,
    });

    /** TAG */
    const tagKeyFunction = (tag: ScopeChangeTag) => keys.tag(tag.procosysNumber);
    const getTag = async (tag: ScopeChangeTag) => await getTagById(procosysPlantId, tag.procosysId);
    useEagerLoading({
        items: request.tags,
        key: tagKeyFunction,
        queryFn: getTag,
    });

    /** Documents */
    const documentKeyFunction = (doc: ScopeChangeDocument) => document(doc.stidDocumentNumber);
    const getDoc = async (doc: ScopeChangeDocument) =>
        await getDocumentById(doc.stidDocumentNumber, 'JCA');

    useEagerLoading({
        items: request.documents,
        key: documentKeyFunction,
        queryFn: getDoc,
    });
}
