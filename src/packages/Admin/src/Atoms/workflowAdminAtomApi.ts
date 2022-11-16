import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { WorkflowStepTemplate, WorkflowTemplate } from '@equinor/Workflow';

export interface FormAtomApi extends DefaultAtomAPI<WorkflowTemplateModel> {
    useIsValid: () => boolean;
    clearState: () => void;
    prepareWorkflowTemplate: () => WorkflowTemplateModel;
}

export type WorkflowTemplateModel = Partial<WorkflowTemplate>;

export const WorkflowAdminAtomApi = createAtom<WorkflowTemplateModel, FormAtomApi>({}, (api) => ({
    useIsValid: () => useIsValid(api),
    prepareWorkflowTemplate: () => prepareWorkflowTemplate(),
    clearState: () =>
        api.updateAtom({
            id: '',
            isPublished: false,
            workflowStepTemplates: [],
        }),
}));

function useIsValid(api: DefaultAtomAPI<WorkflowTemplateModel>): boolean {
    const [isValid, setIsValid] = useState<boolean>(false);
    api.useOnAtomStateChanged(
        (s) => checkFormState(s) !== isValid && setIsValid((valid) => !valid)
    );

    return isValid;
}

const MANDATORY_PROPERTIES: (keyof WorkflowTemplateModel)[] = [];

// function checkString(value?: string) {
//     return !value || value.length <= 0;
// }

function prepareWorkflowTemplate(): WorkflowTemplateModel {
    const { readAtomValue } = WorkflowAdminAtomApi;

    const template: WorkflowTemplateModel = {
        ...readAtomValue(),
    };
    template.workflowStepTemplates?.map((step: WorkflowStepTemplate) => {
        step.criteriaTemplates = step.workflowStepCriteriaTemplates;
        return step;
    });
    return template as WorkflowTemplateModel;
}

function checkFormState(workflowTemplate: Pick<WorkflowTemplateModel, 'id'>): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(workflowTemplate).includes(k))) {
        /** Validate content */
        // switch (true) {
        //     case checkString(releaseControl.title):
        //         return false;
        //     case checkString(releaseControl.phase):
        //         return false;
        //     case checkString(releaseControl.description):
        //         return false;
        //     case checkString(releaseControl.plannedDueDate):
        //         return false;
        // }

        return true;
    } else {
        return false;
    }
}