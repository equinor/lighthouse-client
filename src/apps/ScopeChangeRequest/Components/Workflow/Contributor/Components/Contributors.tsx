import { Button, Icon, TextField, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useState } from 'react';

import {
    Contributor as ContributorInterface,
    WorkflowStep,
} from '../../../../Types/scopeChangeRequest';
import { MenuButton, MenuItem } from '../../../MenuButton/';
import { ContributorActions } from '../../Types/actions';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { submitContribution } from '../../../../Api/ScopeChange/Workflow';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { canContribute } from '../../../../Api/ScopeChange/Access';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { useScopechangeQueryKeyGen } from '../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useScopechangeMutationKeyGen } from '../../../../Hooks/React-Query/useScopechangeMutationKeyGen';
import { useIsWorkflowLoading } from '../../../../Hooks/React-Query/useIsWorkflowLoading';
import { CriteriaStatus } from '../../Criteria/Components/CriteriaDetail';
import { useScopeChangeQuery } from '../../../../Hooks/React-Query/useScopeChangeQuery';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
}

export const Contributor = ({ step, contributor }: ContributorsProps): JSX.Element => {
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState<boolean>(false);
    const { request } = useScopeChangeContext();
    const workflowLoading = useIsWorkflowLoading();

    const { workflowKeys } = useScopechangeQueryKeyGen(request.id);
    const { workflowKeys: workflowMutationKeys } = useScopechangeMutationKeyGen(request.id);

    const checkCanContribute = () =>
        canContribute({ contributorId: contributor.id, requestId: request.id, stepId: step.id });

    const { data: userCanContribute, remove: invalidateUserCanContribute } = useScopeChangeQuery(
        workflowKeys.contributorKey(step.id, contributor.id),
        checkCanContribute,
        'Failed to get permissions',
        {
            staleTime: CacheTime.FiveMinutes,
            cacheTime: CacheTime.FiveMinutes,
        }
    );

    const { mutateAsync } = useScopeChangeMutation(
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
                    await mutateAsync({
                        contributorId: contributor.id,
                        requestId: request.id,
                        stepId: step.id,
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

    return (
        <>
            <ContributorContainer key={contributor.id}>
                <ContributorInnerContainer>
                    <Inline>
                        <WorkflowIcon status={contributorStatus(contributor, step.isCurrent)} />
                        <Spacer />
                        <WorkflowText>
                            <Tooltip
                                title={`${contributor.person.firstName} ${contributor.person.lastName}`}
                            >
                                <div>{contributor.instructionsToContributor}</div>
                            </Tooltip>
                            <div style={{ fontSize: '14px' }}>
                                {contributor.person.firstName} {contributor.person.lastName}
                            </div>
                        </WorkflowText>
                    </Inline>
                    {request.state === 'Open' && !request.isVoided && (
                        <>
                            {step.isCurrent &&
                                !workflowLoading &&
                                makeContributorActions().length > 0 && (
                                    <Inline>
                                        <MenuButton
                                            items={makeContributorActions()}
                                            onMenuOpen={() => setShowCommentField(false)}
                                            buttonText="Confirm"
                                        />
                                    </Inline>
                                )}
                        </>
                    )}
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
                            <Button
                                disabled={!comment}
                                onClick={() =>
                                    mutateAsync({
                                        contributorId: contributor.id,
                                        requestId: request.id,
                                        stepId: step.id,
                                        comment: comment,
                                    })
                                }
                            >
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
