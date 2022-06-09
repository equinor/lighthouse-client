import { TypedSelectOption } from '../../api/Search/searchType';
import { searchPunchListItems } from '../../api/FAM/searchPunchListItems';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../functions/FAM/generateFAMRequest';
import { throwOnError } from '../../functions/throwError';

export type FAMTypes = 'punch' | 'famtag' | 'ht cable';

interface FAMSearch {
    searchFAM: (
        searchValue: string,
        type: FAMTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

/**
 * Hook for searching in FAM
 */
export function useFAMSearch(): FAMSearch {
    async function search(
        searchValue: string,
        type: FAMTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'punch': {
                const items = await searchPunchListItems(searchValue, signal);
                return items.map(
                    ({ description, punchItemNo }): TypedSelectOption => ({
                        label: `${punchItemNo} - ${description}`,
                        object: { description, punchItemNo },
                        searchValue: punchItemNo.toString(),
                        type: 'punch',
                        value: punchItemNo.toString(),
                    })
                );
            }

            case 'famtag': {
                const items = await searchFamTag(searchValue, signal);
                return items;
            }

            case 'ht cable': {
                const items = await searchHtCables(searchValue, signal);
                return items;
            }

            default: {
                throw new Error('Unknown searchItem');
            }
        }
    }

    return {
        searchFAM: search,
    };
}

async function searchFamTag(
    searchText: string,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const { FAM } = httpClient();

    const columns: string[] = [
        'Facility',
        'Project',
        'TagNo',
        'Description',
        'Register',
        /**Causes internal server error */
        // 'Function',
        'CommissioningPackageNo',
        'MechanicalCompletionPackageNo',
        'PackageNo',
        'CallOffNo',
        'Status',
        'Discipline',
        'FunctionalSystem',
        'Location',
        'IsVoided',
        'CreatedDate',
        'UpdatedDate',
        'SourceName',
        'SourceIdentity',
    ];
    const expressions = generateExpressions('TagNo', 'Like', [searchText]);

    const requestArgs = generateFamRequest(columns, 'Or', expressions, { take: 50, skip: 0 });
    const res = await FAM.fetch('v0.1/dynamic/completion/completiontag/JCA', {
        method: 'POST',
        body: JSON.stringify(requestArgs),
        signal,
    });

    await throwOnError(res, 'Failed to get tags');

    const famTags: FamTag[] = await res.json();

    if (!Array.isArray(famTags)) {
        throw 'Invalid response';
    }

    return famTags.map((s) => ({
        label: `${s.tagNo} - ${s.description}`,
        object: s,
        searchValue: s.tagNo,
        type: 'famtag',
        value: s.tagNo,
    }));
}

async function searchHtCables(
    searchText: string,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const { FAM } = httpClient();

    const columns: string[] = [
        'Facility',
        'Project',
        'TagNo',
        'Description',
        'Register',
        /**Causes internal server error */
        // 'Function',
        'CommissioningPackageNo',
        'MechanicalCompletionPackageNo',
        'PackageNo',
        'CallOffNo',
        'Status',
        'Discipline',
        'FunctionalSystem',
        'Location',
        'IsVoided',
        'CreatedDate',
        'UpdatedDate',
        'SourceName',
        'SourceIdentity',
    ];

    const typeExpression = generateExpressions('Register', 'Equals', ['HEAT_TRACING_CABLE']);
    const expressions = generateExpressions('TagNo', 'Like', [searchText]);

    const requestArgs = generateFamRequest(columns, 'And', [...typeExpression, ...expressions], {
        take: 50,
        skip: 0,
    });

    const res = await FAM.fetch('v0.1/dynamic/completion/completiontag/JCA', {
        method: 'POST',
        body: JSON.stringify(requestArgs),
        signal,
    });

    await throwOnError(res, 'Failed to get punch list items');

    const famTags: FamTag[] = await res.json();

    if (!Array.isArray(famTags)) {
        throw 'Invalid response';
    }

    return famTags.map((s) => ({
        label: `${s.tagNo} - ${s.description}`,
        object: s,
        searchValue: s.tagNo,
        type: 'ht cable',
        value: s.tagNo,
    }));
}

export interface FamTag {
    facility: string;
    project: string;
    tagNo: string;
    tagId: string;
    description: string;
    register: string | null;
    function: string | null;
    mechanicalCompletionPackageNo: string;
    commissioningPackageNo: string;
    packageNo: string | null;
    callOffNo: string | null;
    status: string | null;
    discipline: string | null;
    functionalSystem: string | null;
    location: string | null;
    isVoided: string | null;
    createdDate: string | null;
    updatedDate: string | null;
}
