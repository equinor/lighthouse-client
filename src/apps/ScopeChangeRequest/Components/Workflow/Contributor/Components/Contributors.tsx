import { Button, Divider, Icon, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import {
    Contributor as ContributorInterface,
    WorkflowStep,
} from '../../../../types/scopeChangeRequest';
import { MenuButton, MenuItem, IconMenu } from '../../../MenuButton/';
import { ContributorActions } from '../../Types/actions';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { submitContribution } from '../../../../api/ScopeChange/Workflow';
import { useScopeChangeContext } from '../../../../context/useScopeChangeAccessContext';
import { useScopeChangeMutation } from '../../../../hooks/React-Query/useScopechangeMutation';
import { useIsWorkflowLoading } from '../../../../hooks/React-Query/useIsWorkflowLoading';
import { removeContributor } from '../../../../api/ScopeChange/Workflow/removeContributor';
import { scopeChangeMutationKeys } from '../../../../keys/scopeChangeMutationKeys';
import { scopeChangeQueries } from '../../../../keys/queries';
import { getContributorStatus } from '../Utils/getContributorStatus';
import {
    ButtonContainer,
    ContributorContainer,
    ContributorInnerContainer,
    Inline,
    Spacer,
    WorkflowText,
} from './contributor.styles';

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

    const queryClient = useQueryClient();

    const { canContributeQuery } = scopeChangeQueries.workflowQueries;
    const { data: userCanContribute } = useQuery(
        canContributeQuery(request.id, step.id, contributor.id)
    );

    const cancelNewOptionsCall = async () => {
        await queryClient.cancelQueries(
            canContributeQuery(request.id, step.id, contributor.id).queryKey
        );
    };

    const { mutate: removeContributorAsync } = useScopeChangeMutation(
        request.id,
        workflowMutationKeys.deleteContributorKey(step.id),
        removeContributor,
        {
            onSuccess: () => {
                cancelNewOptionsCall;
            },
        }
    );

    const { mutate } = useScopeChangeMutation(
        request.id,
        workflowMutationKeys.contributeKey(step.id, contributor.id),
        submitContribution
    );

    function makeContributorActions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (userCanContribute && contributor.contribution === null) {
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
        const options: MenuItem[] = [];

        if (canRemoveContributor) {
            options.push({
                label: 'Remove contributor',
                isDisabled: !canRemoveContributor,
                onClick: () =>
                    removeContributorAsync({
                        contributorId: contributor.id,
                        requestId: request.id,
                        stepId: step.id,
                    }),
            });
        }

        if (userCanContribute && contributor.contribution) {
            options.push({
                label: 'Update with comment',
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowCommentField((prev) => !prev),
                isDisabled: !userCanContribute,
            });
        }

        return options;
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
                        <WorkflowIcon status={getContributorStatus(contributor, step.isCurrent)} />
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
