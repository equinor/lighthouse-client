import { swap } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import { IconMenu, MenuButton, MenuItem } from '@equinor/overlay-menu';

import { CriteriaActions } from '../../Types/actions';

import { ButtonContainer } from '../../Contributor/contributor.styles';
import { useReleaseControlContext } from '../../../../hooks/useReleaseControlContext';
import { releaseControlQueries } from '../../../../queries/queries';
import { CriteriaSignState } from '../../../../../ScopeChangeRequest/types/scopeChangeRequest';
import { actionWithCommentAtom } from '../../Atoms/signingAtom';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { useWorkflowSigning } from '../../../../hooks/useWorkflowSigning';
import { useReleaseControlMutation } from '../../../../../DisciplineReleaseControl/Hooks/useReleaseControlMutation';
import { unsignCriteria } from '../../../../api/releaseControl/Workflow';
import { useWorkflowCriteriaOptions } from '../../../../hooks/useWorkflowCriteriaOptions';

interface CriteriaActionBarProps {
    criteriaId: string;
    stepId: string;
    stepOrder: number;
    setShowAddContributor: () => void;
}

export const CriteriaActionBar = ({
    criteriaId,
    stepId,
    stepOrder,
    setShowAddContributor,
}: CriteriaActionBarProps): JSX.Element => {
    const { requestId, isCurrentStep } = useReleaseControlContext(({ releaseControl }) => ({
        requestId: releaseControl.id,
        isCurrentStep: releaseControl.currentWorkflowStep?.id === stepId,
    }));

    const { canAddContributorQuery } = releaseControlQueries.workflowQueries;

    const { data: isAllowedToAddContributor } = useQuery(canAddContributorQuery(requestId, stepId));

    const iconGrey = tokens.colors.text.static_icons__tertiary.hex;

    const { canReassign, canSign, canUnsign } = useWorkflowCriteriaOptions(
        requestId,
        criteriaId,
        stepId
    );

    const generateAtom = (action: CriteriaSignState | 'Reassign', buttonText: string) => ({
        criteriaId: criteriaId,
        stepId: stepId,
        action: action,
        buttonText: buttonText,
    });

    const signMutation = useWorkflowSigning({
        criteriaId: criteriaId,
        stepId: stepId,
        requestId: requestId,
    });

    const setShowSendBackWithComment = () =>
        swap(actionWithCommentAtom, () => generateAtom('Disputed', 'Send back'));

    const setShowSignWithComment = () =>
        swap(actionWithCommentAtom, () => generateAtom('Approved', 'Sign'));

    const setShowRejectWithComment = () =>
        swap(actionWithCommentAtom, () => generateAtom('Rejected', 'Reject'));

    const setShowReassignBar = () =>
        swap(actionWithCommentAtom, () => generateAtom('Reassign', 'Confirm'));

    function makeSignOptions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (canSign) {
            actions.push({
                label: CriteriaActions.Sign,
                icon: <Icon name="check_circle_outlined" color={iconGrey} />,
                onClick: () => signMutation({ action: 'Approved', comment: '' }),
                isDisabled: !canSign,
            });
            actions.push({
                label: 'Sign with comment',
                icon: <Icon name="comment_add" color={iconGrey} />,
                onClick: setShowSignWithComment,
                isDisabled: !canSign,
            });

            actions.push({
                label: 'Reject with comment',
                onClick: setShowRejectWithComment,
                icon: <Icon name="close_circle_outlined" color={iconGrey} />,
                isDisabled: !canSign,
            });
            if (stepOrder !== 0) {
                actions.push({
                    label: 'Send back with comment',
                    icon: <Icon name="undo" color={iconGrey} />,
                    onClick: setShowSendBackWithComment,
                    isDisabled: !canSign,
                });
            }
        }
        return actions;
    }

    const { criteriaUnsignKey } = releaseControlMutationKeys(requestId).workflowKeys;

    const { mutate: unSignMutation } = useReleaseControlMutation(
        requestId,
        criteriaUnsignKey(stepId, criteriaId),
        unsignCriteria
    );

    function makeMoreActions(): MenuItem[] {
        const actions: MenuItem[] = [];
        if (canReassign) {
            actions.push({
                label: CriteriaActions.Reassign,
                icon: <Icon name="assignment_user" color={iconGrey} />,
                onClick: setShowReassignBar,
                isDisabled: !canReassign,
            });
        }
        if (canUnsign) {
            actions.push({
                label: 'Unsign',
                onClick: () =>
                    unSignMutation({
                        criteriaId: criteriaId,
                        requestId: requestId,
                        stepId: stepId,
                    }),
                isDisabled: !canUnsign,
            });
        }
        if (isAllowedToAddContributor && isCurrentStep) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color={iconGrey} />,
                onClick: setShowAddContributor,
                isDisabled: !isAllowedToAddContributor,
            });
        }
        return actions;
    }

    return (
        <ButtonContainer>
            {makeSignOptions().length > 0 && (
                <MenuButton items={makeSignOptions()} buttonText="Sign" />
            )}
            {makeMoreActions().length > 0 && <IconMenu items={makeMoreActions()} />}
        </ButtonContainer>
    );
};
