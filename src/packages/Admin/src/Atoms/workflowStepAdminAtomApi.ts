import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { WorkflowStepTemplate } from '@equinor/Workflow';

export interface FormAtomApi extends DefaultAtomAPI<WorkflowStepModel> {
    useIsValid: () => boolean;
    clearState: () => void;
    prepareWorkflowStep: (owner: string) => WorkflowStepModel;
}

export type WorkflowStepModel = Partial<WorkflowStepTemplate>;

export const WorkflowStepAdminAtomApi = createAtom<WorkflowStepModel, FormAtomApi>({}, (api) => ({
    useIsValid: () => useIsValid(api),
    prepareWorkflowStep: (owner) => prepareWorkflowStep(owner),
    clearState: () =>
        api.updateAtom({
            id: '',
            name: '',
            description: '',
            completedStatusName: '',
            rejectedStatusName: '',
            order: 0,
            owner: '',
        }),
}));

function useIsValid(api: DefaultAtomAPI<WorkflowStepModel>): boolean {
    const [isValid, setIsValid] = useState<boolean>(false);
    api.useOnAtomStateChanged(
        (s) => checkFormState(s) !== isValid && setIsValid((valid) => !valid)
    );
    return isValid;
}

const MANDATORY_PROPERTIES: (keyof WorkflowStepModel)[] = ['name', 'completedStatusName'];

function checkString(value?: string) {
    return !value || value.length <= 0;
}

function prepareWorkflowStep(owner: string): WorkflowStepModel {
    const { readAtomValue } = WorkflowStepAdminAtomApi;

    const template: WorkflowStepModel = {
        ...readAtomValue(),
        owner: owner,
    };

    return template as WorkflowStepModel;
}

function checkFormState(
    workflowStep: Pick<WorkflowStepModel, 'name' | 'completedStatusName'>
): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(workflowStep).includes(k))) {
        /** Validate content */
        switch (true) {
            case checkString(workflowStep.name):
                return false;
            case checkString(workflowStep.completedStatusName):
                return false;
        }
        return true;
    } else {
        return false;
    }
}
