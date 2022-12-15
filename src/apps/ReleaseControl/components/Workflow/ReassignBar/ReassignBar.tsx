import { PCSPersonRoleSearch, resetSigningAtom } from '@equinor/Workflow';
import { reassignCriteria } from '../../../api/releaseControl/Workflow';
import { useReleaseControlMutation } from '../../../hooks/useReleaseControlMutation';
import { releaseControlMutationKeys } from '../../../queries/releaseControlMutationKeys';

interface ReassignBarProps {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export const ReassignBar = ({ criteriaId, requestId, stepId }: ReassignBarProps): JSX.Element => {
    const { criteriaReassignKey } = releaseControlMutationKeys(requestId).workflowKeys;

    const { mutate: reassignMutation } = useReleaseControlMutation(
        requestId,
        criteriaReassignKey(stepId, criteriaId),
        reassignCriteria
    );

    return (
        <PCSPersonRoleSearch
            onSelect={(value) => {
                if (!value) return;
                reassignMutation({
                    requestId: requestId,
                    stepId: stepId,
                    criteriaId: criteriaId,
                    reassign: {
                        type: `${
                            value.type === 'functionalRole'
                                ? 'RequireProcosysFunctionalRoleSignature'
                                : 'RequireProcosysUserSignature'
                        }`,
                        value: value.value,
                    },
                });
                resetSigningAtom();
            }}
            classification="RELEASECONTROL"
        />
    );
};
