import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { TypedSelectOption } from '../../ScopeChangeRequest/api/Search/searchType';
import { ProcoSysTypes } from '../types/PCS/ProCoSysTypes';
import { StidTypes } from '../types/PCS/STIDTypes';
import { CreateReleaseControlStepModel, FamTag } from '../types/releaseControl';

interface ReleaseControlReferencesAndScope {
    documentNumbers: string[];
    punch: string[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];

    //TODO remove
    areaCodes: string[];
    tagNumbers: string[];
}

interface ReleaseControlPackedSteps {
    editedWorkflowSteps?: CreateReleaseControlStepModel[];
    signedWorkflowSteps?: CreateReleaseControlStepModel[];
}
export interface DRCCreateModel {
    id?: string;
    step?: 'scope' | 'workflow';
    title?: string;
    description?: string;
    plannedDueDate?: string;
    phase?: string;
    allowContributors?: boolean;
    documentNumbers?: string[];
    punchList?: string[];
    references?: TypedSelectOption[];
    tags?: TypedSelectOption[];
    htCables?: TypedSelectOption[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
    workflowSteps?: CreateReleaseControlStepModel[];
    editedWorkflowSteps?: CreateReleaseControlStepModel[];
    signedWorkflowSteps?: CreateReleaseControlStepModel[];

    //TODO - remove when backend updated
    tagNumbers?: string[];
    areaCodes?: string[];
}

export type DRCFormModel = Partial<DRCCreateModel>;

interface FormAtomApi extends DefaultAtomAPI<DRCFormModel> {
    unPackReferencesAndScope: () => ReleaseControlReferencesAndScope;
    useIsValid: () => boolean;
    clearState: () => void;
    prepareRequest: () => DRCFormModel;
}

export const DRCFormAtomApi = createAtom<DRCFormModel, FormAtomApi>({}, (api) => ({
    unPackReferencesAndScope: () => unPackReferencesAndScope(api),
    useIsValid: () => useIsValid(api),
    prepareRequest: () => prepareRequest(),
    clearState: () =>
        api.updateAtom({
            description: undefined,
            allowContributors: true,
            documentNumbers: [],
            punchList: [],
            plannedDueDate: '',
            workflowSteps: [],
            title: undefined,
            phase: undefined,
            references: [],
            id: undefined,
            step: 'scope',
            editedWorkflowSteps: [],
            signedWorkflowSteps: [],
            tags: [],
            htCables: [],
            scopeTags: [],
            scopeHTTags: [],

            //TODO remove
            tagNumbers: [],
            areaCodes: [],
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

function unPackReferencesAndScope(
    api: DefaultAtomAPI<DRCFormModel>
): ReleaseControlReferencesAndScope {
    const references = api.readAtomValue().references ?? [];
    const tags = api.readAtomValue().tags?.map((x) => x.object as FamTag) ?? [];
    const htCables = api.readAtomValue().htCables?.map((x) => x.object as FamTag) ?? [];
    tags.forEach((x) => {
        x.area = x.location;
        x.tagType = x.register;
        x.system = x.functionalSystem;
    });
    htCables.forEach((x) => {
        x.area = x.location;
        x.tagType = x.register;
        x.system = x.functionalSystem;
    });

    return {
        scopeTags: tags,
        scopeHTTags: htCables,
        punch: unpackByType(references, 'punch'),
        documentNumbers: unpackByType(references, 'document'),

        //TODO remove
        tagNumbers: [],
        areaCodes: [],
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
    const { readAtomValue, unPackReferencesAndScope } = DRCFormAtomApi;

    const newReq: DRCCreateModel = {
        ...readAtomValue(),
        ...unPackReferencesAndScope(),
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
        //Do not allow empty responsible (except initiate)
        if (
            request.workflowSteps?.some((step) =>
                step.criteriaTemplates.some(
                    (criteria) =>
                        step.name !== 'Initiate' &&
                        (criteria.value === null || criteria.value === '')
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
