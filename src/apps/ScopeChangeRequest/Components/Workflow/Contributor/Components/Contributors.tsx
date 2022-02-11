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
import { useScopeChangeMutation } from '../../../../Hooks/useScopechangeMutation';
import { useQuery } from 'react-query';
import { canContribute } from '../../../../Api/ScopeChange/Access';
import { ServerError } from '../../../../Api/ScopeChange/Types/ServerError';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
}

export const Contributor = ({ step, contributor }: ContributorsProps): JSX.Element => {
    const [comment, setComment] = useState('');
    const [showCommentField, setShowCommentField] = useState<boolean>(false);
    const { request, setErrorMessage } = useScopeChangeContext();

    const checkCanContribute = () => canContribute({ contributorId: contributor.id, requestId: request.id, stepId: step.id })

    const { data: userCanContribute } = useQuery(`step/${step.id}/contributor/${contributor.id}`, checkCanContribute, { refetchOnWindowFocus: false })


    const { mutateAsync } = useScopeChangeMutation(submitContribution, {
        onError: (e: ServerError) => setErrorMessage(e),
    });


    function makeContributorActions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (userCanContribute) {
            actions.push({
                label: ContributorActions.Confirm,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: async () => await mutateAsync({ contributorId: contributor.id, requestId: request.id, stepId: step.id, comment: undefined }),
            })
            actions.push({
                label: ContributorActions.ConfirmWithComment,
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowCommentField((prev) => !prev),
            })
        }
        return actions
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
                            {step.isCurrent && contributor.contribution === null && (
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
                            <Button disabled={!comment} onClick={() => mutateAsync({ contributorId: contributor.id, requestId: request.id, stepId: step.id, comment: comment })}>
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

type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

function contributorStatus(
    contributor: ContributorInterface,
    currentStep: boolean
): WorkflowStatus {
    if (contributor.contribution) {
        return 'Completed';
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
