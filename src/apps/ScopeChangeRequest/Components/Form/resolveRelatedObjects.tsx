import { FetchQueryOptions } from 'react-query';

import { TypedSelectOption } from '../../Api/Search/searchType';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { getCommPkgById } from '../../Api/PCS/getCommPkgById';
import { getSystems } from '../../Api/PCS/getSystems';
import { getDisciplines } from '../../Api/PCS/getDisciplines';
import { getTagById } from '../../Api/PCS/getTagById';
import { getDocumentById } from '../../Api/STID/getDocumentById';
import { getAreaByCode } from '../../Api/PCS/getAreaByCode';

export async function resolveRelatedObjects(
    request: ScopeChangeRequest,
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>,
    referencesKeys: {
        baseKey: string[];
        disciplines: string[];
        systems: string[];
        document: (documentId: string) => string[];
        area: (areaId: string) => string[];
        tag: (tagId: string) => string[];
        commPkg: (commPkgId: string) => string[];
    },
    addToQueryCache: <T>(
        queryKey: string[],
        queryFn: () => Promise<T>,
        options?: FetchQueryOptions<T, unknown, T, string[]> | undefined
    ) => Promise<T>
): Promise<void> {
    const appendRelatedObjects = (x: TypedSelectOption) =>
        setRelatedObjects((prev) => [...prev, x]);
    const patchRelatedObjects = (x: TypedSelectOption) =>
        setRelatedObjects((prev) => {
            const index = prev.findIndex(({ value }) => value === x.value);
            if (index === -1) return [...prev, x];

            const newList = [...prev.slice(0, index), x, ...prev.slice(index + 1)];
            return newList;
        });

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
            getCommPkgById(x.procosysId)
        );

        patchRelatedObjects({
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
            getTagById(x.procosysId)
        );

        patchRelatedObjects({
            ...tagSelectOption,
            label: `${x.procosysNumber} ${tag.Description}`,
            object: tag,
        });
    });

    //TODO: JCA injected
    request.documents.forEach(async (x) => {
        const documentSelectOption: TypedSelectOption = {
            label: `${x.stidDocumentNumber}`,
            value: x.stidDocumentNumber,
            object: x,
            searchValue: x.stidDocumentNumber,
            type: 'document',
        };
        appendRelatedObjects(documentSelectOption);

        const document = await addToQueryCache(referencesKeys.document(x.stidDocumentNumber), () =>
            getDocumentById(x.stidDocumentNumber, 'JCA')
        );

        patchRelatedObjects({
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
            getAreaByCode(x.procosysCode)
        );

        patchRelatedObjects({
            ...areaSelectOption,
            label: `${x.procosysCode} ${area.Description}`,
            object: area,
        });
    });

    const disciplines = await addToQueryCache(referencesKeys.disciplines, getDisciplines);
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

        patchRelatedObjects({
            ...disciplineSelectOption,
            label: `${x.procosysCode} ${match?.Description}`,
            object: match,
        });
    });

    const systems = await addToQueryCache(referencesKeys.systems, getSystems);
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

        patchRelatedObjects({
            ...systemSelectOption,
            label: `${x.procosysCode} ${system?.Description}`,
            object: system,
        });
    });
}
