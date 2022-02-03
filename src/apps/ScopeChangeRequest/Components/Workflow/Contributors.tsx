import { Button, Icon, TextField, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useConditionalRender } from '../../Hooks/useConditionalRender';
import { Contributor as ContributorInterface, WorkflowStep } from '../../Types/scopeChangeRequest';
import { MenuButton, MenuItem } from '../MenuButton/';
import { ContributorActions } from './Types/actions';
import { WorkflowIcon } from './WorkflowIcon';

interface ContributorsProps {
    step: WorkflowStep;
    contributor: ContributorInterface;
}

export const Contributor = ({ step, contributor }: ContributorsProps): JSX.Element => {
    const {
        Component: CommentField,
        toggle: toggleCommentField,
        set: setShowCommentField,
    } = useConditionalRender(
        <div
            style={{
                fontSize: '12px',
                display: 'flex',
                alignItems: 'flex-end',
                width: '300px',
                justifyContent: 'space-around',
            }}
        >
            <span>
                Comment
                <TextField id="comment" />
            </span>
            <Button variant="outlined">Confirm</Button>
        </div>
    );

    const contributorActions: MenuItem[] = [
        {
            label: ContributorActions.Confirm,
            icon: <Icon name="check_circle_outlined" color="grey" />,
        },
        {
            label: ContributorActions.ConfirmWithComment,
            icon: <Icon name="comment_add" color="grey" />,
            onClick: () => toggleCommentField(),
        },
    ];

    return (
        <>
            <ContributorContainer key={contributor.id}>
                <ContributorInnerContainer>
                    <Inline>
                        <WorkflowIcon
                            status={contributorStatus(contributor, step.isCurrent)}
                            number={'#'}
                        />
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
                <CommentField />
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
