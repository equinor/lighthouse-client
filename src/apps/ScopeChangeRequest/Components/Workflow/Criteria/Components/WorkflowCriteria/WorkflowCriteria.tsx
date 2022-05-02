import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import { Criteria, CriteriaSignState, WorkflowStep } from '../../../../../types/scopeChangeRequest';
import { reassignCriteria, unsignCriteria } from '../../../../../api/ScopeChange/Workflow';
import { useScopeChangeContext } from '../../../../../Hooks/context/useScopeChangeAccessContext';
import { useConditionalRender } from '../../../../../hooks/utils/useConditionalRender';
import { CriteriaDetail } from '../CriteriaDetail';
import { CriteriaActions } from '../../../Types/actions';
import { AddContributor } from '../AddContributor';
import { PCSPersonRoleSearch } from '../../../../PersonRoleSearch/PCSPersonRoleSearch';
import { IconMenu, MenuItem, MenuButton } from '../../../../MenuButton';
import { useWorkflowCriteriaOptions } from '../../../../../hooks/queries/useWorkflowCriteriaOptions';
import { QueryObserver, useQueryClient } from 'react-query';
import { scopeChangeMutationKeys } from '../../../../../keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../../../../keys/scopeChangeQueryKeys';
import { useIsWorkflowLoading } from '../../../../../hooks/React-Query/useIsWorkflowLoading';
import { useScopeChangeMutation } from '../../../../../hooks/React-Query/useScopechangeMutation';
import { SignWithComment } from '../SignWithComment/SignWithComment';
import { useWorkflowSigning } from '../../../../../hooks/mutations/useWorkflowSigning';
import { Atom, swap, useAtom } from '@dbeining/react-atom';
import { Inline, ReassignPadding, WorkflowStepViewContainer } from './workflowCriteria.styles';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
    canAddContributor: boolean;
}

export const WorkflowCriteria = ({
    step,
    criteria,
    canAddContributor,
}: WorkflowCriteriasProps): JSX.Element => {
    const requestId = useScopeChangeContext({ select: (s) => s.request.id });

    const signMutation = useWorkflowSigning({
        criteriaId: criteria.id,
        stepId: step.id,
        requestId: requestId,
    });

    const setShowSendBackWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Disputed' as const,
            buttonText: 'Send back',
            criteriaId: criteria.id,
            stepId: step.id,
        }));

    const setShowSignWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Approved' as const,
            buttonText: 'Sign',
            criteriaId: criteria.id,
            stepId: step.id,
        }));

    const setShowRejectWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Rejected' as const,
            buttonText: 'Reject',
            criteriaId: criteria.id,
            stepId: step.id,
        }));

    const { workflowKeys } = scopeChangeMutationKeys(requestId);
    const workflowLoading = useIsWorkflowLoading();

    const { criteriaUnsignKey, criteriaReassignKey } = workflowKeys;

    const { canReassign, canSign, canUnsign } = useWorkflowCriteriaOptions(
        requestId,
        criteria.id,
        step.id
    );

    const iconGrey = tokens.colors.text.static_icons__tertiary.hex;

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
            if (step.order !== 0) {
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

    function makeMoreActions(): MenuItem[] {
        const actions: MenuItem[] = [];
        if (canReassign) {
            actions.push({
                label: CriteriaActions.Reassign,
                icon: <Icon name="assignment_user" color={iconGrey} />,
                onClick: toggleReassign,
                isDisabled: !canReassign,
            });
        }
        if (canUnsign) {
            actions.push({
                label: 'Unsign',
                onClick: () =>
                    unSignMutation({
                        criteriaId: criteria.id,
                        requestId: requestId,
                        stepId: step.id,
                    }),
                isDisabled: !canUnsign,
            });
        }
        if (canAddContributor && step.isCurrent) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color={iconGrey} />,
                onClick: toggleContributorSelector,
                isDisabled: !canAddContributor,
            });
        }
        return actions;
    }

    const {
        isShowing: ReassignBarIsShowing,
        Component: ReassignBar,
        toggle: toggleReassign,
        set: setShowReassign,
    } = useConditionalRender(
        <PCSPersonRoleSearch
            onSelect={(value) => {
                if (!value) return;
                reassignMutation({
                    requestId: requestId,
                    stepId: step.id,
                    criteriaId: criteria.id,
                    reassign: {
                        type: `${value.type === 'functionalRole'
                                ? 'RequireProcosysFunctionalRoleSignature'
                                : 'RequireProcosysUserSignature'
                            }`,
                        value: value.value,
                    },
                });
                closeAll();
            }}
        />
    );

    const {
        Component: ContributorSelector,
        toggle: toggleContributorSelector,
        set: setShowContributor,
    } = useConditionalRender(
        <AddContributor close={() => setShowContributor(false)} step={step} />
    );

    const { mutate: reassignMutation } = useScopeChangeMutation(
        requestId,
        criteriaReassignKey(step.id, criteria.id),
        reassignCriteria
    );

    const { mutate: unSignMutation } = useScopeChangeMutation(
        requestId,
        criteriaUnsignKey(step.id, criteria.id),
        unsignCriteria
    );

    const closeAll = () => {
        swap(actionWithCommentAtom, () => null);
        setShowReassign(false);
        setShowContributor(false);
    };

    /** Close all dialogs/inputs when an action happens */
    const { baseKey } = scopeChangeQueryKeys(requestId);
    const queryClient = useQueryClient();
    useEffect(() => {
        // Create an observer to watch the query and update its result into state
        const observer = new QueryObserver(queryClient, {
            queryKey: baseKey,
            enabled: false,
        });

        const unsubscribe = observer.subscribe(() => {
            closeAll();
        });

        // Clean up the subscription when the component unmounts
        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseKey, queryClient, setShowContributor, setShowReassign]);

    const state = useAtom(actionWithCommentAtom);

    return (
        <>
            <WorkflowStepViewContainer key={criteria.id}>
                {ReassignBarIsShowing ? (
                    <ReassignPadding>
                        <ReassignBar />
                    </ReassignPadding>
                ) : (
                    <CriteriaDetail criteria={criteria} step={step} />
                )}

                <Inline>
                    {!workflowLoading && makeSignOptions().length > 0 && (
                        <MenuButton
                            items={makeSignOptions()}
                            onMenuOpen={closeAll}
                            buttonText="Sign"
                        />
                    )}
                    {!workflowLoading && makeMoreActions().length > 0 && (
                        <IconMenu items={makeMoreActions()} onMenuOpen={closeAll} />
                    )}
                </Inline>
            </WorkflowStepViewContainer>

            <ContributorSelector />
            {state && state.criteriaId === criteria.id && (
                <SignWithComment
                    action={state.action}
                    buttonText={state.buttonText}
                    criteriaId={state.criteriaId}
                    stepId={state.stepId}
                />
            )}
        </>
    );
};

interface SigningAction {
    buttonText: string;
    action: CriteriaSignState;
    criteriaId: string;
    stepId: string;
}

export const actionWithCommentAtom = Atom.of<SigningAction | null>(null);
