import {
    addStepAfter,
    addStepBefore,
    duplicateStep,
    getNewWorkflowSteps,
    removeStep,
    updateStepName,
    updateStepResponsible,
} from '../components/Form/WorkflowEditor/WorkflowEditorHelpers';
import { testSteps } from '../Mock/mockData';

describe('electroViewHelpers tests', () => {
    it('should return one step which is "Initiate" step', () => {
        expect(getNewWorkflowSteps()).toHaveLength(1);
        expect(getNewWorkflowSteps()[0].name).toStrictEqual('Initiate');
    });
    it('should update name', () => {
        const steps = testSteps;
        expect(updateStepName(steps[1], steps, 'Demount ISO')[1].name).toStrictEqual('Demount ISO');
    });
    it('should update responsible', () => {
        const steps = testSteps;
        expect(
            updateStepResponsible(
                steps[1],
                steps,
                'RC - Insulation',
                '',
                'RequireProcosysFunctionalRoleSignature'
            )[1].criteriaTemplates[0].value
        ).toStrictEqual('RC - Insulation');
    });
    it('should add empty step after and at the right position', () => {
        const steps = testSteps;
        expect(addStepAfter(steps[2], steps)[3].name).toStrictEqual('');
        expect(addStepAfter(steps[2], steps)[3].order).toStrictEqual(4);
    });
    it('should add empty step before and at the right position', () => {
        const steps = testSteps;
        expect(addStepBefore(steps[2], steps)[2].name).toStrictEqual('');
        expect(addStepBefore(steps[2], steps)[2].order).toStrictEqual(3);
    });
    it('should add duplicate step and put it after original step', () => {
        const steps = testSteps;
        expect(duplicateStep(steps[4], steps)[5].name).toStrictEqual('Coordinator');
        expect(duplicateStep(steps[4], steps)[5].order).toStrictEqual(6);
    });
    it('should add remove the correct step', () => {
        const steps = testSteps;
        expect(removeStep(steps[3], steps)[3].name).toStrictEqual('Coordinator');
    });
});
