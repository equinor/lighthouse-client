import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

import { Criteria, WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { reassignCriteria, unsignCriteria } from '../../../../Api/ScopeChange/Workflow/';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useConditionalRender } from '../../../../Hooks/useConditionalRender';
import { CriteriaDetail } from './CriteriaDetail';
import { CriteriaActions } from '../../Types/actions';
import { AddContributor } from './AddContributor';
import { PCSPersonRoleSearch } from '../../../SearchableDropdown/PCSPersonRoleSearch';
import { IconMenu, MenuItem, MenuButton } from '../../../MenuButton';
import { ServerError } from '../../../../Types/ScopeChange/ServerError';
import { useWorkflowCriteriaOptions } from '../../../../Hooks/useWorkflowCriteriaOptions';
import { QueryObserver, useQueryClient } from 'react-query';
import { scopeChangeMutationKeys } from '../../../../Keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../../../Keys/scopeChangeQueryKeys';
import { useIsWorkflowLoading } from '../../../../Hooks/React-Query/useIsWorkflowLoading';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { SignWithCommentBar } from './SignWithCommentBar';
import { useWorkflowSigning } from './useWorkflowSigning';

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
    const { request, setErrorMessage } = useScopeChangeContext();

    const signMutation = useWorkflowSigning({
        criteriaId: criteria.id,
        stepId: step.id,
        requestId: request.id,
    });

    const [showSignWithComment, setShowSignWithComment] = useState(false);
    const [showRejectWithComment, setShowRejectWithComment] = useState(false);

    const { workflowKeys } = scopeChangeMutationKeys(request.id);
    const workflowLoading = useIsWorkflowLoading();

    const { criteriaUnsignKey, criteriaReassignKey } = workflowKeys;

    const { canReassign, canSign, canUnsign } = useWorkflowCriteriaOptions(
        request.id,
        criteria.id,
        step.id,
        setErrorMessage
    );

    function makeSignOptions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (canSign) {
            actions.push({
                label: CriteriaActions.Sign,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: () =>
                    signMutation({ action: 'Approved', closeRequest: false, comment: '' }),
                isDisabled: !canSign,
            });
            actions.push({
                label: 'Sign with comment',
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowSignWithComment(true),
                isDisabled: !canSign,
            });

            actions.push({
                label: 'Reject and close',
                onClick: () =>
                    signMutation({ action: 'Rejected', closeRequest: true, comment: '' }),
                isDisabled: !canSign,
            });
            if (step.order !== 0) {
                actions.push({
                    label: 'Reject with comment',
                    icon: <Icon name="close_circle_outlined" color="grey" />,
                    onClick: () => setShowRejectWithComment(true),
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
                icon: <Icon name="assignment_user" color="grey" />,
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
                        requestId: request.id,
                        stepId: step.id,
                    }),
                isDisabled: !canUnsign,
            });
        }
        if (canAddContributor && step.isCurrent) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color="grey" />,
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
                    requestId: request.id,
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

    const { mutateAsync: reassignMutation } = useScopeChangeMutation(
        request.id,
        criteriaReassignKey(step.id, criteria.id),
        reassignCriteria,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    const { mutateAsync: unSignMutation } = useScopeChangeMutation(
        request.id,
        criteriaUnsignKey(step.id, criteria.id),
        unsignCriteria,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    const closeAll = () => {
        setShowSignWithComment(false);
        setShowRejectWithComment(false);
        setShowReassign(false);
        setShowContributor(false);
    };

    /** Close all dialogs/inputs when an action happens */
    const { baseKey } = scopeChangeQueryKeys(request.id);
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
            {showRejectWithComment && (
                <SignWithCommentBar
                    action="Rejected"
                    closeRequest={false}
                    criteriaId={criteria.id}
                    stepId={step.id}
                />
            )}
            {showSignWithComment && (
                <SignWithCommentBar
                    action={'Approved'}
                    stepId={step.id}
                    criteriaId={criteria.id}
                    closeRequest={false}
                />
            )}
        </>
    );
};

const ReassignPadding = styled.div`
    padding: 0em 0.5em;
    width: 100%;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 48px;
    align-items: center;
    width: -webkit-fill-available;
    &:hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
    }
`;

const Inline = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;
