import { TextField, Button, Divider } from '@equinor/eds-core-react';
import { useState } from 'react';
import { submitContribution } from '../../../api/ScopeChange/Workflow';
import { WorkflowIcon } from '../Components/WorkflowIcon';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { Contributor } from '../../../types/scopeChangeRequest';
import { RowContent, WorkflowRow, WorkflowWrapper } from '../workflowLayout.styles';
import { FlexColumn, CommentFieldWrapper, ButtonContainer } from './contributor.styles';
import { ContributorActionBar } from './ContributorActionbar';
import { getContributorStatus } from './getContributorStatus';

interface ContributorRenderProps {
    contributor: Contributor;
    stepId: string;
}

export const ContributorRender = ({ contributor, stepId }: ContributorRenderProps): JSX.Element => {
    const { isCurrentStep } = useScopeChangeContext(({ request }) => ({
        isCurrentStep: stepId === request.currentWorkflowStep?.id,
    }));

    const [showCommentField, setShowCommentField] = useState<boolean>(false);

    const hideCommentField = () => setShowCommentField(false);
    const renderCommentField = () => setShowCommentField(true);

    return (
        <WorkflowWrapper>
            <WorkflowIcon status={getContributorStatus(contributor, isCurrentStep)} number={'#'} />
            <WorkflowRow>
                <RowContent>
                    <FlexColumn>
                        <span>{contributor.instructionsToContributor}</span>
                        <span>
                            {contributor.person.firstName} {contributor.person.lastName}
                        </span>
                        {contributor.contribution?.comment && (
                            <q>{contributor.contribution?.comment}</q>
                        )}
                    </FlexColumn>
                    <ContributorActionBar
                        stepId={stepId}
                        contributor={contributor}
                        setShowCommentField={renderCommentField}
                    />
                </RowContent>
                {showCommentField && (
                    <ContributorConfirmComment
                        closeCommentField={hideCommentField}
                        contributorId={contributor.id}
                        stepId={stepId}
                    />
                )}
            </WorkflowRow>
        </WorkflowWrapper>
    );
};

interface ContributorConfirmCommentProps {
    stepId: string;
    contributorId: string;
    closeCommentField: () => void;
}

export const ContributorConfirmComment = ({
    contributorId,
    stepId,
    closeCommentField,
}: ContributorConfirmCommentProps): JSX.Element => {
    const requestId = useScopeChangeContext((a) => a.request.id);

    const [comment, setComment] = useState('');

    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(requestId);
    const { mutate } = useScopeChangeMutation(
        requestId,
        workflowMutationKeys.contributeKey(stepId, contributorId),
        submitContribution
    );

    function handleSignClick() {
        closeCommentField();
        mutate({
            contributorId: contributorId,
            requestId: requestId,
            stepId: stepId,
            suggestion: comment.length > 0 ? 'Comment' : 'SuggestApproval',
            comment: comment,
        });
    }

    return (
        <CommentFieldWrapper>
            <>
                Comment
                <TextField
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </>
            <ButtonContainer>
                <Button disabled={!comment} onClick={handleSignClick}>
                    Confirm
                </Button>
                <Divider />
                <Button onClick={closeCommentField} variant="outlined">
                    Cancel
                </Button>
            </ButtonContainer>
        </CommentFieldWrapper>
    );
};
