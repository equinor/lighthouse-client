import { useEffect } from 'react';
import { useFacility } from '../../../../Core/Client/Hooks';
import { getAreaByCode } from '../../api/PCS/getAreaByCode';
import { getCommPkgById } from '../../api/PCS/getCommPkgById';
import { getDisciplines } from '../../api/PCS/getDisciplines';
import { getSystems } from '../../api/PCS/getSystems';
import { getTagById } from '../../api/PCS/getTagById';
import { TypedSelectOption } from '../../api/Search/searchType';
import { getDocumentById } from '../../api/STID/getDocumentById';
import { proCoSysQueryKeys } from '../../keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../../keys/STIDQueryKeys';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { useQueryCacheLookup } from '../React-Query/useQueryCacheLookup';

interface UseUnpackRelatedObjectsParams {
    request: ScopeChangeRequest;
    getReferences: () => TypedSelectOption[];
    handleReferencesChanged: (references: TypedSelectOption[]) => void;
}

export function useUnpackRelatedObjects({
    getReferences,
    handleReferencesChanged,
    request,
}: UseUnpackRelatedObjectsParams): void {
    const { addToQueryCache } = useQueryCacheLookup();
    const referencesKeys = { ...proCoSysQueryKeys(), ...stidQueryKeys() };
    const { procosysPlantId: plantId, facilityId } = useFacility();

    useEffect(() => {
        unpackRelatedObjects(request, getReferences, handleReferencesChanged);
    }, [request]);

    function updateReferences(x: TypedSelectOption) {
        const index = getReferences().findIndex(({ value }) => value === x.value);
        if (index === -1) {
            handleReferencesChanged([...getReferences(), x]);
            return;
        }

        handleReferencesChanged([
            ...getReferences().slice(0, index),
            x,
            ...getReferences().slice(index + 1),
        ]);
    }

    async function unpackRelatedObjects(
        request: ScopeChangeRequest,
        getReferences: () => TypedSelectOption[],
        handleReferencesChanged: (references: TypedSelectOption[]) => void
    ) {
        const appendRelatedObjects = (x: TypedSelectOption) =>
            handleReferencesChanged([...getReferences(), x]);

        request.commissioningPackages.forEach(async (x) => {
            const commPkgSelectOption: TypedSelectOption = {
                label: `${x.procosysNumber}`,
                object: x,
                searchValue: x.procosysNumber,
                type: 'commpkg',
                value: x.procosysNumber,
            };
            appendRelatedObjects(commPkgSelectOption);

            const commPkg = await addToQueryCache(referencesKeys.commPkg(x.procosysNumber), () =>
                getCommPkgById(plantId, x.procosysId)
            );

            updateReferences({
                ...commPkgSelectOption,
                label: `${x.procosysNumber} ${commPkg.Description}`,
                object: commPkg,
            });
        });

        request.tags.forEach(async (x) => {
            const tagSelectOption: TypedSelectOption = {
                label: `${x.procosysNumber}`,
                value: x.procosysNumber,
                object: x,
                searchValue: x.procosysNumber,
                type: 'tag',
            };
            appendRelatedObjects(tagSelectOption);

            const tag = await addToQueryCache(referencesKeys.tag(x.procosysNumber), () =>
                getTagById(plantId, x.procosysId)
            );

            updateReferences({
                ...tagSelectOption,
                label: `${x.procosysNumber} ${tag.Description}`,
                object: tag,
                metadata: `Comm pkg: ${tag.CommPkgNo} Tag register: ${tag.RegisterCode}`,
            });
        });

        request.documents.forEach(async (x) => {
            const documentSelectOption: TypedSelectOption = {
                label: `${x.stidDocumentNumber}`,
                value: x.stidDocumentNumber,
                object: x,
                searchValue: x.stidDocumentNumber,
                type: 'document',
            };
            appendRelatedObjects(documentSelectOption);

            const document = await addToQueryCache(
                referencesKeys.document(x.stidDocumentNumber),
                () => getDocumentById(x.stidDocumentNumber, facilityId)
            );

            updateReferences({
                ...documentSelectOption,
                label: `${x.stidDocumentNumber} ${document.docTitle}`,
                object: document,
            });
        });

        request.areas.forEach(async (x) => {
            const areaSelectOption: TypedSelectOption = {
                label: `${x.procosysCode}`,
                value: x.procosysCode,
                object: x,
                searchValue: x.procosysCode,
                type: 'area',
            };
            appendRelatedObjects(areaSelectOption);

            const area = await addToQueryCache(referencesKeys.area(x.procosysCode), () =>
                getAreaByCode(plantId, x.procosysCode)
            );

            updateReferences({
                ...areaSelectOption,
                label: `${x.procosysCode} ${area.Description}`,
                object: area,
            });
        });

        const disciplines = await addToQueryCache(referencesKeys.disciplines, () =>
            getDisciplines(plantId)
        );
        request.disciplines.forEach((x) => {
            const disciplineSelectOption: TypedSelectOption = {
                label: `${x.procosysCode}`,
                value: x.procosysCode,
                object: x,
                searchValue: x.procosysCode,
                type: 'discipline',
            };

            appendRelatedObjects(disciplineSelectOption);

            const match = disciplines.find((discipline) => discipline.Code === x.procosysCode);

            updateReferences({
                ...disciplineSelectOption,
                label: `${x.procosysCode} ${match?.Description}`,
                object: match,
            });
        });

        const systems = await addToQueryCache(referencesKeys.systems, () => getSystems(plantId));
        request.systems.forEach((x) => {
            const systemSelectOption: TypedSelectOption = {
                label: `${x.procosysCode}`,
                value: x.procosysId.toString(),
                object: x,
                searchValue: x.procosysCode,
                type: 'system',
            };

            appendRelatedObjects(systemSelectOption);

            const system = systems.find((loc) => loc.Code === x.procosysCode);

            updateReferences({
                ...systemSelectOption,
                label: `${x.procosysCode} ${system?.Description}`,
                object: system,
            });
        });
    }
}
