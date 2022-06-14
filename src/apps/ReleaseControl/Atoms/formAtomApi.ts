import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { TypedSelectOption } from '../../ScopeChangeRequest/api/Search/searchType';
import { ProcoSysTypes } from '../types/PCS/ProCoSysTypes';
import { StidTypes } from '../types/PCS/STIDTypes';
import { CreateReleaseControlStepModel } from '../types/releaseControl';

interface ReleaseControlReferences {
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
}

interface ReleaseControlPackedSteps {
    editedWorkflowSteps?: CreateReleaseControlStepModel[];
    signedWorkflowSteps?: CreateReleaseControlStepModel[];
}
export interface DRCCreateModel {
    id?: string;
    title?: string;
    description?: string;
    plannedDueDate?: string;
    phase?: string;
    allowContributors?: boolean;
    tagNumbers?: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
    references?: TypedSelectOption[];
    workflowSteps?: CreateReleaseControlStepModel[];
    editedWorkflowSteps?: CreateReleaseControlStepModel[];
    signedWorkflowSteps?: CreateReleaseControlStepModel[];
}

export type DRCFormModel = Partial<DRCCreateModel>;

interface FormAtomApi extends DefaultAtomAPI<DRCFormModel> {
    unPackReferences: () => ReleaseControlReferences;
    useIsValid: () => boolean;
    clearState: () => void;
    prepareRequest: () => DRCFormModel;
}

export const DRCFormAtomApi = createAtom<DRCFormModel, FormAtomApi>({}, (api) => ({
    unPackReferences: () => unPackReferences(api),
    useIsValid: () => useIsValid(api),
    prepareRequest: () => prepareRequest(),
    clearState: () =>
        api.updateAtom({
            areaCodes: [],
            commissioningPackageNumbers: [],
            description: undefined,
            allowContributors: true,
            documentNumbers: [],
            plannedDueDate: undefined,
            systemIds: [],
            tagNumbers: [],
            workflowSteps: [],
            title: undefined,
        }),
}));

function useIsValid(api: DefaultAtomAPI<DRCFormModel>): boolean {
    const [isValid, setIsValid] = useState<boolean>(false);
    api.useOnAtomStateChanged(
        (s) => checkFormState(s) !== isValid && setIsValid((valid) => !valid)
    );

    return isValid;
}

const MANDATORY_PROPERTIES: (keyof DRCFormModel)[] = ['title', 'description'];

function checkString(value?: string) {
    return !value || value.length <= 0;
}

function unPackReferences(api: DefaultAtomAPI<DRCFormModel>): ReleaseControlReferences {
    const references = api.readAtomValue().references ?? [];
    return {
        areaCodes: unpackByType(references, 'area'),
        commissioningPackageNumbers: unpackByType(references, 'commpkg'),
        documentNumbers: unpackByType(references, 'document'),
        systemIds: unpackByType(references, 'system') as unknown as number[],
        tagNumbers: unpackByType(references, 'tag'),
    };
}

function packWorkflowSteps(api: DefaultAtomAPI<DRCFormModel>): ReleaseControlPackedSteps {
    const editedSteps = api.readAtomValue().workflowSteps?.filter((x) => !x.isCompleted) ?? [];
    const signedSteps = api.readAtomValue().workflowSteps?.filter((x) => x.isCompleted) ?? [];
    return {
        editedWorkflowSteps: editedSteps,
        signedWorkflowSteps: signedSteps,
    };
}

function unpackByType(
    list: TypedSelectOption[],
    referenceType: ProcoSysTypes | StidTypes
): string[] {
    return list.filter(({ type }) => type === referenceType).map(({ value }) => value);
}

function prepareRequest(): DRCFormModel {
    const { readAtomValue, unPackReferences } = DRCFormAtomApi;

    const newReq: DRCCreateModel = {
        ...readAtomValue(),
        ...unPackReferences(),
        ...packWorkflowSteps(DRCFormAtomApi),
    };
    return newReq as DRCFormModel;
}

function checkFormState(
    request: Pick<
        DRCFormModel,
        'title' | 'description' | 'plannedDueDate' | 'phase' | 'workflowSteps'
    >
): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(request).includes(k))) {
        /** Validate content */
        switch (true) {
            case checkString(request.title):
                return false;

            case checkString(request.description):
                return false;
            case checkString(request.plannedDueDate):
                return false;
        }
        //Do not allow empty workflowSteps
        if (request.workflowSteps === undefined || request.workflowSteps.length === 0) {
            return false;
        }
        //Do not allow empty steps
        if (request.workflowSteps?.some((step) => step.name === null || step.name === '')) {
            return false;
        }
        //Do not allow empty responsible
        if (
            request.workflowSteps?.some((step) =>
                step.criteriaTemplates.some(
                    (criteria) => criteria.value === null || criteria.value === ''
                )
            )
        ) {
            return false;
        }

        return true;
    } else {
        return false;
    }
}
