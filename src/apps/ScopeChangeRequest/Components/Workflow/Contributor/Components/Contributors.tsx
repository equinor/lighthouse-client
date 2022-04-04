import { Button, Icon, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';

import {
    Contributor as ContributorInterface,
    WorkflowStep,
} from '../../../../sTypes/scopeChangeRequest';
import { MenuButton, MenuItem, IconMenu } from '../../../MenuButton/';
import { ContributorActions } from '../../Types/actions';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { submitContribution } from '../../../../api/ScopeChange/Workflow';
import { useScopeChangeContext } from '../../../../scontext/useScopeChangeAccessContext';
import { useScopeChangeMutation } from '../../../../sHooks/react-Query/useScopechangeMutation';
import { useIsWorkflowLoading } from '../../../../sHooks/react-Query/useIsWorkflowLoading';
import { CriteriaStatus } from '../../Criteria/Components/CriteriaDetail';
import { removeContributor } from '../../../../api/ScopeChange/Workflow/removeContributor';
import { scopeChangeMutationKeys } from '../../../../sKeys/scopeChangeMutationKeys';
import { scopeChangeQueries } from '../../../../sKeys/queries';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
    canRemoveContributor: boolean;
}

export const Contributor = ({
    step,
    contributor,
    canRemoveContributor,
}: ContributorsProps): JSX.Element => {
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState<boolean>(false);
    const { request } = useScopeChangeContext();
    const workflowLoading = useIsWorkflowLoading();

    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(request.id);

    const { mutate: removeContributorAsync } = useScopeChangeMutation(
        request.id,
        workflowMutationKeys.deleteContributorKey(step.id),
        removeContributor
    );

    const { canContributeQuery } = scopeChangeQueries.workflowQueries;
    const { data: userCanContribute, remove: invalidateUserCanContribute } = useQuery(
        canContributeQuery(request.id, step.id, contributor.id)
    );

    const { mutate } = useScopeChangeMutation(
        request.id,
        workflowMutationKeys.contributeKey(step.id, contributor.id),
        submitContribution,
        {
            onSuccess: () => invalidateUserCanContribute(),
        }
    );

    function makeContributorActions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (userCanContribute) {
            actions.push({
                label: ContributorActions.Confirm,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: async () =>
                    mutate({
                        contributorId: contributor.id,
                        requestId: request.id,
                        stepId: step.id,
                        suggestion: 'SuggestApproval',
                        comment: undefined,
                    }),
                isDisabled: !userCanContribute,
            });
            actions.push({
                label: ContributorActions.ConfirmWithComment,
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowCommentField((prev) => !prev),
                isDisabled: !userCanContribute,
            });
        }
        return actions;
    }

    function makeMoreActions(): MenuItem[] {
        return canRemoveContributor
            ? [
                {
                    label: 'Remove contributor',
                    isDisabled: !canRemoveContributor,
                    onClick: () =>
                        removeContributorAsync({
                            contributorId: contributor.id,
                            requestId: request.id,
                            stepId: step.id,
                        }),
                },
            ]
            : [];
    }

    function shouldRenderContributorActions() {
        return step.isCurrent && makeContributorActions().length > 0;
    }

    function handleSignClick() {
        setShowCommentField(false);
        mutate({
            contributorId: contributor.id,
            requestId: request.id,
            stepId: step.id,
            suggestion: comment.length > 0 ? 'Comment' : 'SuggestApproval',
            comment: comment,
        });
    }

    return (
        <>
            <ContributorContainer key={contributor.id}>
                <ContributorInnerContainer>
                    <Inline>
                        <WorkflowIcon status={contributorStatus(contributor, step.isCurrent)} />
                        <Spacer />
                        <WorkflowText>
                            <div>{contributor.instructionsToContributor}</div>

                            <div style={{ fontSize: '14px' }}>
                                {contributor.person.firstName} {contributor.person.lastName}
                            </div>
                            {contributor.contribution?.comment && (
                                <q>{contributor.contribution?.comment}</q>
                            )}
                        </WorkflowText>
                    </Inline>

                    <>
                        <Inline>
                            {!workflowLoading && (
                                <>
                                    {shouldRenderContributorActions() && (
                                        <MenuButton
                                            items={makeContributorActions()}
                                            onMenuOpen={() => setShowCommentField(false)}
                                            buttonText="Confirm"
                                        />
                                    )}
                                    {makeMoreActions().length > 0 && (
                                        <IconMenu items={makeMoreActions()} />
                                    )}
                                </>
                            )}
                        </Inline>
                    </>
                </ContributorInnerContainer>
                {showCommentField && (
                    <div style={{ margin: '0.4rem 0rem' }}>
                        <span>
                            Comment
                            <TextField
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </span>
                        <ButtonContainer>
                            <Button disabled={!comment} onClick={handleSignClick}>
                                Confirm
                            </Button>
                            <Divider />
                            <Button onClick={() => setShowCommentField(false)} variant="outlined">
                                Cancel
                            </Button>
                        </ButtonContainer>
                    </div>
                )}
            </ContributorContainer>
        </>
    );
};

const ContributorContainer = styled.div`
    padding: 0px 32px;
    width: -webkit-fill-available;
    margin-bottom: 0.5rem;
`;

const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;

const Spacer = styled.div`
    height: 9px;
    width: 0.5rem;
`;

const ContributorInnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    width: -webkit-fill-available;
    &:hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
    }
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

function contributorStatus(
    contributor: ContributorInterface,
    currentStep: boolean
): CriteriaStatus {
    if (contributor.contribution) {
        return 'Approved';
    }

    if (currentStep) {
        return 'Active';
    } else {
        return 'Inactive';
    }
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0.2rem;
`;

const Divider = styled.div`
    width: 0.5rem;
`;
