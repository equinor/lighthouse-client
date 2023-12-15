import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { FamTag, ScopeChangeRequestReference, TypedSelectOption } from '@equinor/Workflow';
import { useState } from 'react';
import { ProcoSysTypes } from '@equinor/Workflow';
import { StidTypes } from '@equinor/Workflow';
import { CreateReleaseControlStepModel } from '../types/releaseControl';

interface ReleaseControlReferencesAndScope {
    documentNumbers: string[];
    punchListItemIds: string[];
    scopeChangeRequestReferences: ScopeChangeRequestReference[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
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
    requestedByOption?: TypedSelectOption;
    requestedBy?: string;
    plannedDueDate?: string;
    phase?: string;
    allowContributors?: boolean;
    documentNumbers?: string[];
    punchListItemIds?: string[];
    scopeChangeRequestReferences: ScopeChangeRequestReference[];
    references?: TypedSelectOption[];
    tags?: TypedSelectOption[];
    htCables?: TypedSelectOption[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
    workflowSteps?: CreateReleaseControlStepModel[];
    editedWorkflowSteps?: CreateReleaseControlStepModel[];
    signedWorkflowSteps?: CreateReleaseControlStepModel[];
    newAttachments?: File[];
}

export type DRCFormModel = Partial<DRCCreateModel>;

interface FormAtomApi extends DefaultAtomAPI<DRCFormModel> {
    unPackReferencesAndScope: () => ReleaseControlReferencesAndScope;
    useIsValid: () => boolean;
    clearState: () => void;
    prepareReleaseControl: () => DRCFormModel;
}

export const DRCFormAtomApi = createAtom<DRCFormModel, FormAtomApi>({}, (api) => ({
    unPackReferencesAndScope: () => unPackReferencesAndScope(api),
    useIsValid: () => useIsValid(api),
    prepareReleaseControl: () => prepareReleaseControl(),
    clearState: () =>
        api.updateAtom({
            description: '',
            requestedBy: undefined,
            allowContributors: true,
            documentNumbers: [],
            punchListItemIds: [],
            scopeChangeRequestReferences: [],
            plannedDueDate: '',
            workflowSteps: [],
            title: '',
            phase: '',
            references: [],
            id: '',
            step: 'scope',
            editedWorkflowSteps: [],
            signedWorkflowSteps: [],
            tags: [],
            htCables: [],
            scopeTags: [],
            scopeHTTags: [],
            newAttachments: [],
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
        x.circuitTagNos = x.circuitAndStarterTagNos;
        x.mountedOn = x.tagMountedOn;
        x.tagMountedOn = x.tagMountedOnNo;
    });
    htCables.forEach((x) => {
        x.area = x.location;
        x.tagType = x.register;
        x.system = x.functionalSystem;
        x.circuitTagNos = x.circuitAndStarterTagNos;
        x.mountedOn = x.tagMountedOn;
        x.tagMountedOn = x.tagMountedOnNo;
        x.tagHeated = x.heatedTagNos;
    });
    return {
        scopeTags: tags,
        scopeHTTags: htCables,
        punchListItemIds: unpackByType(references, 'punch'),
        documentNumbers: unpackByType(references, 'document'),
        scopeChangeRequestReferences: references
            .filter(({ type }) => type === 'scopechangerequest')
            .map((x) => x.object as ScopeChangeRequestReference),
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

function prepareReleaseControl(): DRCFormModel {
    const { readAtomValue, unPackReferencesAndScope } = DRCFormAtomApi;

    const newRC: DRCCreateModel = {
        ...readAtomValue(),
        ...unPackReferencesAndScope(),
        ...packWorkflowSteps(DRCFormAtomApi),
    };
    delete newRC.requestedByOption;
    return newRC as DRCFormModel;
}

function checkFormState(
    releaseControl: Pick<
        DRCFormModel,
        'title' | 'description' | 'requestedBy' | 'plannedDueDate' | 'phase' | 'workflowSteps'
    >
): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(releaseControl).includes(k))) {
        /** Validate content */
        switch (true) {
            case checkString(releaseControl.title):
                return false;
            case checkString(releaseControl.phase):
                return false;
            case checkString(releaseControl.description):
                return false;
            case checkString(releaseControl.requestedBy):
                return false;
            case checkString(releaseControl.plannedDueDate):
                return false;
        }
        //Do not allow empty workflowSteps
        if (
            releaseControl.workflowSteps === undefined ||
            releaseControl.workflowSteps.length === 0
        ) {
            return false;
        }
        //Do not allow empty steps
        if (releaseControl.workflowSteps?.some((step) => step.name === null || step.name === '')) {
            return false;
        }
        //Do not allow empty responsible
        if (
            releaseControl.workflowSteps?.some((step) =>
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
