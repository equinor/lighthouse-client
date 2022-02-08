import { Button, Icon, TextField, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import {
    Contributor as ContributorInterface,
    WorkflowStep,
} from '../../../Types/scopeChangeRequest';
import { MenuButton, MenuItem } from '../../MenuButton/';
import { ContributorActions } from '../Types/actions';
import { WorkflowIcon } from './WorkflowIcon';
import { useMutation } from 'react-query';
import { addContribution } from '../../../Api/ScopeChange/Workflow';
import { useScopeChangeAccessContext } from '../../Sidesheet/Context/useScopeChangeAccessContext';
import { useState } from 'react';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
}

export const Contributor = ({ step, contributor }: ContributorsProps): JSX.Element => {
    const [comment, setComment] = useState('');

    const [showCommentField, setShowCommentField] = useState<boolean>(false);

    const { request, refetch } = useScopeChangeAccessContext();

    const onAddContribution = () =>
        addContribution(request.id, step.id, contributor.id, comment).then(() => refetch());

    const { mutateAsync } = useMutation(onAddContribution);

    const contributorActions: MenuItem[] = [
        {
            label: ContributorActions.Confirm,
            icon: <Icon name="check_circle_outlined" color="grey" />,
            onClick: async () => await mutateAsync(),
        },
        {
            label: ContributorActions.ConfirmWithComment,
            icon: <Icon name="comment_add" color="grey" />,
            onClick: () => setShowCommentField((prev) => !prev),
        },
    ];

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
                    {step.isCurrent && contributor.contribution === null && (
                        <Inline>
                            <MenuButton
                                items={contributorActions}
                                onMenuOpen={() => setShowCommentField(false)}
                                buttonText="Confirm"
                            />
                        </Inline>
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
                            <Button disabled={!comment} onClick={() => onAddContribution()}>
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
