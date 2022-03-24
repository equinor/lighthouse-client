import { useFacility } from '../../../Core/Client/Hooks';
import { getAreaByCode } from '../Api/PCS/getAreaByCode';
import { getCommPkgById } from '../Api/PCS/getCommPkgById';
import { getTagById } from '../Api/PCS/getTagById';
import { getDocumentById } from '../Api/STID/getDocumentById';
import { proCoSysQueryKeys } from '../Keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../Keys/STIDQueryKeys';
import {
    Area,
    CommissioningPackage,
    Document,
    ScopeChangeRequest,
    Tag,
} from '../Types/scopeChangeRequest';
import { useEagerLoading } from './React-Query/useEagerLoading';

export function useEagerLoadingReferences(request: ScopeChangeRequest): void {
    const { procosysPlantId } = useFacility();

    const keys = proCoSysQueryKeys();
    const { document } = stidQueryKeys();

    /** Comm pkgs */
    const keyFunction = (pkg: CommissioningPackage) => keys.commPkg(pkg.procosysNumber);
    const queryFn = async (pkg: CommissioningPackage) =>
        await getCommPkgById(procosysPlantId, pkg.procosysId);
    useEagerLoading({
        items: request.commissioningPackages,
        key: keyFunction,
        queryFn: queryFn,
    });

    /** AREA */
    const areaKeyFunction = (area: Area) => keys.area(area.procosysCode);
    const getArea = async (area: Area) => await getAreaByCode(procosysPlantId, area.procosysCode);
    useEagerLoading({
        items: request.areas,
        key: areaKeyFunction,
        queryFn: getArea,
    });

    /** TAG */
    const tagKeyFunction = (tag: Tag) => keys.tag(tag.procosysNumber);
    const getTag = async (tag: Tag) => await getTagById(procosysPlantId, tag.procosysId);
    useEagerLoading({
        items: request.tags,
        key: tagKeyFunction,
        queryFn: getTag,
    });

    /** Documents */
    const documentKeyFunction = (doc: Document) => document(doc.stidDocumentNumber);
    const getDoc = async (doc: Document) => await getDocumentById(doc.stidDocumentNumber, 'JCA');
    useEagerLoading({
        items: request.documents,
        key: documentKeyFunction,
        queryFn: getDoc,
    });
}
