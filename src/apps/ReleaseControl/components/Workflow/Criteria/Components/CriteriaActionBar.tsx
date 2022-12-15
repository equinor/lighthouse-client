import { swap } from '@dbeining/react-atom';
import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import { IconMenu, MiniMenuButton, MenuItem } from '@equinor/overlay-menu';

import { CriteriaActions } from '../../Types/actions';

import { ButtonContainer } from '../../Contributor/contributor.styles';
import { releaseControlQueries } from '../../../../queries/queries';
import { releaseControlMutationKeys } from '../../../../queries/releaseControlMutationKeys';
import { unsignCriteria } from '../../../../api/releaseControl/Workflow';
import {
    useReleaseControlContext,
    useReleaseControlMutation,
    useWorkflowCriteriaOptions,
    useWorkflowSigning,
} from '../../../../hooks';
import { actionWithCommentAtom, CriteriaSignState } from '@equinor/Workflow';

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
    const { requestId, isCurrentStep, isPreviousStep } = useReleaseControlContext(
        ({ releaseControl }) => ({
            requestId: releaseControl.id,
            isCurrentStep: releaseControl.currentWorkflowStep?.id === stepId,
            isPreviousStep: releaseControl.currentWorkflowStep?.order === stepOrder + 1,
        })
    );
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

    function getSignButton(): JSX.Element | null {
        if (canSign) {
            return (
                <Button
                    id="anchor-complex"
                    aria-controls="menu-complex"
                    aria-haspopup="true"
                    onClick={() => {
                        signMutation({ action: 'Approved', comment: '' });
                    }}
                    disabled={!canSign}
                >
                    {'Sign'}
                </Button>
            );
        } else {
            return null;
        }
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
        if (canUnsign && isPreviousStep) {
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
            {getSignButton()}
            {makeSignOptions().length > 0 && <MiniMenuButton items={makeSignOptions()} />}
            {makeMoreActions().length > 0 && <IconMenu items={makeMoreActions()} />}
        </ButtonContainer>
    );
};
