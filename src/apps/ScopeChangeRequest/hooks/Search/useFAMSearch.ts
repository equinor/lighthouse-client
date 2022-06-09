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
        'TagId',
        'TagNo',
        'Facility',
        'Project',
        'Description',
        'TagCategory',
        'CommissioningPackageNo',
        'MechanicalCompletionPackageNo',
        'Checklists',
        'Signed_Checklists',
        'WorkOrders',
        'ActualStartupDate',
        'PlannedStartupDate',
        'PlannedCompletionDate',
        'WOs',
        'WorkOrdersCompleted',
        'ActualCompletionDate',
        'Tag_Status',
    ];

    const expressions = generateExpressions('TagNo', 'Like', [searchText]);

    const requestArgs = generateFamRequest(columns, 'Or', expressions, { take: 50, skip: 0 });

    const res = await FAM.fetch('v0.1/dynamic/completion/custom_tag/JCA', {
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
        type: 'famtag',
        value: s.tagNo,
    }));
}

export interface FamTag {
    tagId: string;
    tagNo: string;
    facility: string;
    project: string;
    description: string;
    tagCategory: string;
    commissioningPackageNo: string;
    mechanicalCompletionPackageNo: string;
    checklists: number;
    signed_Checklists: number;
    workOrders: number;
    actualStartupDate: string | null;
    plannedStartupDate: string;
    plannedCompletionDate: string;
    wOs: number;
    workOrdersCompleted: number | null;
    actualCompletionDate: string | null;
    tag_Status: string;
}

async function searchHtCables(
    searchText: string,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const { FAM } = httpClient();

    const columns: string[] = [
        'Facility',
        'ChecklistId',
        'TagNo',
        'TagId',
        'Responsible',
        'FormularType',
        'FormularGroup',
        'Status',
        'Revision',
        'SignedDate',
        // 'IsSigned',
        'PipeTest',
        'Location',
        'Description',
        'MechanicalCompletionPackageNo',
        'Priority1',
        'RFC_Planned_Forecast_Date',
        'RFO_Planned_Forecast_Date',
        'CommissioningPackageNo',
        'HeatTraceCableId',
        'ChecklistStep',
        'ChecklistStepSequence',
        'PipetestType',
    ];

    const expressions = generateExpressions('TagNo', 'Like', [searchText]);

    const requestArgs = generateFamRequest(columns, 'Or', expressions, { take: 50, skip: 0 });

    const res = await FAM.fetch('v0.1/dynamic/completion/custom_pipetestchecklist/JCA', {
        method: 'POST',
        body: JSON.stringify(requestArgs),
        signal,
    });

    await throwOnError(res, 'Failed to get punch list items');

    const famTags: FamHtCable[] = await res.json();

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

interface FamHtCable {
    facility: string;
    checklistId: string;
    tagNo: string;
    tagId: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision: string;
    signedDate: string;
    isSigned: string;
    pipeTest: string;
    location: string;
    description: string;
    mechanicalCompletionPackageNo: string;
    priority1: string;
    rFC_Planned_Forecast_Date: string;
    rFO_Planned_Forecast_Date: string;
    commissioningPackageNo: string;
    heatTraceCableId: string;
    checklistStep: string;
    checklistStepSequence: string;
    pipetestType: string;
}
