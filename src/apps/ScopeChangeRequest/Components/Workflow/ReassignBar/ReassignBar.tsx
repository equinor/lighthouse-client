import { reassignCriteria } from '../../../api/ScopeChange/Workflow';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { PCSPersonRoleSearch, resetSigningAtom } from '@equinor/Workflow';

interface ReassignBarProps {
  requestId: string;
  stepId: string;
  criteriaId: string;
}

export const ReassignBar = ({ criteriaId, requestId, stepId }: ReassignBarProps): JSX.Element => {
  const { criteriaReassignKey } = scopeChangeMutationKeys(requestId).workflowKeys;

  const { mutate: reassignMutation } = useScopeChangeMutation(
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
      classification={'SCOPECHANGE'}
    />
  );
};
