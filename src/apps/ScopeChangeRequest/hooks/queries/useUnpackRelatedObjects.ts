import { useEffect } from 'react';
import { useFacility } from '../../../../Core/Client/Hooks';
import { getAreaByCode } from '../../api/PCS/getAreaByCode';
import { getCommPkgById } from '../../api/PCS/getCommPkgById';
import { getSystems } from '../../api/PCS/getSystems';
import { getTagById } from '../../api/PCS/getTagById';
import { TypedSelectOption } from '../../api/Search/searchType';
import { getDocumentById } from '../../api/STID/getDocumentById';
import { transformIsoDate } from '../../Components/Workflow/Utils/dateFormatting';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { useQueryCacheLookup } from '../../../../hooks/QueryCache/useQueryCacheLookup';
import { scopeChangeFormAtomApi } from '../../Atoms/FormAtomApi/formAtomApi';
import { getPunchListItemByNo, proCoSysQueryKeys, stidQueryKeys } from '@equinor/Workflow';
import { getMcPkgById } from '../../api/PCS/getMcPkgById';

interface UseUnpackRelatedObjectsParams {
    request: ScopeChangeRequest;
}

export function useUnpackRelatedObjects({ request }: UseUnpackRelatedObjectsParams): void {
    const { addToQueryCache } = useQueryCacheLookup();
    const referencesKeys = { ...proCoSysQueryKeys(), ...stidQueryKeys() };
    const { procosysPlantId: plantId, facilityId } = useFacility();

    const { updateAtom, readAtomValue } = scopeChangeFormAtomApi;

    const handleReferencesChanged = (newVals: TypedSelectOption[]) => {
        updateAtom({ references: newVals });
    };

    useEffect(() => {
        unpackRelatedObjects(request, handleReferencesChanged);
    }, [request.id]);

    function updateReferences(x: TypedSelectOption) {
        const references = readAtomValue().references ?? [];

        const index = references.findIndex(({ value }) => value === x.value);
        if (index === -1) return;
        handleReferencesChanged([...references.slice(0, index), x, ...references.slice(index + 1)]);
    }

    async function unpackRelatedObjects(
        request: ScopeChangeRequest,
        handleReferencesChanged: (references: TypedSelectOption[]) => void
    ) {
        const { readAtomValue } = scopeChangeFormAtomApi;

        const appendRelatedObjects = (x: TypedSelectOption) =>
            handleReferencesChanged([...(readAtomValue().references ?? []), x]);

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

        request.mcPackages.forEach(async (x) => {
            const mcPkgSelectOption: TypedSelectOption = {
                label: `${x.procosysNumber}`,
                object: x,
                searchValue: x.procosysNumber,
                type: 'mcpkg',
                value: x.procosysNumber,
            };
            appendRelatedObjects(mcPkgSelectOption);

            const mcPkg = await addToQueryCache(referencesKeys.mcPkg(x.procosysNumber), () =>
                getMcPkgById(plantId, x.procosysId)
            );

            updateReferences({
                ...mcPkgSelectOption,
                label: `${x.procosysNumber} ${mcPkg.Description}`,
                object: mcPkg,
            });
        });

        request.punchListItems.forEach(async (x) => {
            const punchSelectedOption: TypedSelectOption = {
                label: `${x.procosysId}`,
                object: x,
                searchValue: x.procosysId.toString(),
                type: 'punch',
                value: x.procosysId.toString(),
            };

            appendRelatedObjects(punchSelectedOption);

            const punch = await addToQueryCache(['Punch', punchSelectedOption.value], () =>
                getPunchListItemByNo(x.procosysId)
            );

            updateReferences({
                ...punchSelectedOption,
                label: `${punch.punchItemNo} ${punch.description}`,
                object: punch,
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
                metadata: `Comm pkg: ${tag.CommPkgNo} | Tag register: ${tag.RegisterCode}`,
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
                metadata: `Revision ${document.currentRevision.revNo} | Rev date ${
                    document.currentRevision.revDate &&
                    transformIsoDate(document.currentRevision.revDate)
                } | Reason for issue ${
                    document.currentRevision.reasonForIssue &&
                    document.currentRevision.reasonForIssue
                }`,
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
