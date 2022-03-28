import { Button, Icon, TextField, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useState } from 'react';

import { MenuButton, MenuItem } from '../../../MenuButton/';
import { ContributorActions } from '../../Types/actions';
import { WorkflowIcon } from '../../Components/WorkflowIcon';
import { useQuery } from 'react-query';
import {
    WorkflowStep,
    Contributor as ContributorInterface,
} from '../../../../Types/disciplineReleaseControl';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { canContribute } from '../../../../Api/Access';
import { useReleaseControlMutation } from '../../../../Hooks/useReleaseControlMutation';
import { useIsWorkflowLoading } from '../../../../Hooks/React-Query/useIsWorkflowLoading';
import { useReleaseControlQueryKeyGen } from '../../../../Hooks/React-Query/useReleaseControlQueryKeyGen';
import { useReleaseControlMutationKeyGen } from '../../../../Hooks/React-Query/useReleaseControlMutationKeyGen';
import { CacheTime } from '../../../../Enums/cacheTimes';
import { submitContribution } from '../../../../Api/Workflow';
import { ServerError } from '../../../../Api/Types/ServerError';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
}

export const Contributor = ({ step, contributor }: ContributorsProps): JSX.Element => {
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState<boolean>(false);
    const { process, setErrorMessage } = useReleaseControlContext();
    const workflowLoading = useIsWorkflowLoading();

    const { workflowKeys } = useReleaseControlQueryKeyGen(process.id);
    const { workflowKeys: workflowMutationKeys } = useReleaseControlMutationKeyGen(process.id);

    const checkCanContribute = () =>
        canContribute({ contributorId: contributor.id, processId: process.id, stepId: step.id });

    const { data: userCanContribute, remove: invalidateUserCanContribute } = useQuery(
        workflowKeys.contributorKey(step.id, contributor.id),
        checkCanContribute,
        {
            refetchOnWindowFocus: false,
            retry: 3,
            staleTime: CacheTime.FiveMinutes,
            cacheTime: CacheTime.FiveMinutes,
            onError: (e: string) =>
                setErrorMessage({
                    detail: e,
                    title: 'Failed to get permissions',
                    validationErrors: {},
                }),
        }
    );

    const { mutateAsync } = useReleaseControlMutation(
        process.id,
        workflowMutationKeys.contributeKey(step.id, contributor.id),
        submitContribution,
        {
            onError: (e: ServerError) => setErrorMessage(e),
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
                        processId: process.id,
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
                    {process.state === 'Open' && !process.isVoided && (
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
                                        processId: process.id,
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

type WorkflowStatus = 'Complete' | 'Active' | 'Inactive' | 'Failed';

function contributorStatus(
    contributor: ContributorInterface,
    currentStep: boolean
): WorkflowStatus {
    if (contributor.contribution) {
        return 'Complete';
    }

    if (currentStep) {
        return 'Active';
    } else {
        return 'Failed';
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
