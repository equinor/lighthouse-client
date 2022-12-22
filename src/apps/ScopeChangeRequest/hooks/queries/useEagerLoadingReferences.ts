import {
    getAreaByCode,
    getCommPkgById,
    getDocumentById,
    getTagById,
    proCoSysQueryKeys,
    stidQueryKeys,
} from '@equinor/Workflow';
import { useFacility } from '../../../../Core/Client/Hooks';
import { getMcPkgById } from '../../../../packages/Workflow/src/Api/PCS/getMcPkgById';

import {
    ScopeChangeArea,
    ScopeChangeCommissioningPackage,
    ScopeChangeDocument,
    ScopeChangeMcPkg,
    ScopeChangeRequest,
    ScopeChangeTag,
} from '../../types/scopeChangeRequest';
import { useEagerLoading } from '../React-Query/useEagerLoading';

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

    /** Mc pkgs */
    const mcPkgKeyFunction = (pkg: ScopeChangeMcPkg) => keys.mcPkg(pkg.procosysNumber);
    const getMcPkg = async (pkg: ScopeChangeMcPkg) =>
        await getMcPkgById(procosysPlantId, pkg.procosysId);
    useEagerLoading({
        items: request.mcPackages,
        key: mcPkgKeyFunction,
        queryFn: getMcPkg,
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
