import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
    canAddContributor,
    canAddContributor,
    canContribute,
} from '../../../../Api/ScopeChange/Access';
import { submitContribution } from '../../../../Api/ScopeChange/Workflow';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../../Keys/scopeChangeMutationKeys';
import { scopeChangeQueryKeys } from '../../../../Keys/scopeChangeQueryKeys';
import {
    Contributor,
    Criteria,
    ScopeChangeRequest,
    WorkflowStep,
} from '../../../../Types/scopeChangeRequest';
import { IconMenu, MenuButton, MenuItem } from '../../../MenuButton';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { ContributorActions } from '../../../Workflow/Types/actions';

export function Workflow2(): JSX.Element {
    const { request } = useScopeChangeContext();

    return (
        <>
            {request.workflowSteps.map((step) => {
                return (
                    <>
                        {step.criterias.map((criteria, index, array) => (
                            <WorkflowCriteria
                                key={criteria.id}
                                criteria={criteria}
                                step={step}
                                shouldRenderContributors={array.length - 1 === index}
                            />
                        ))}
                    </>
                );
            })}
        </>
    );
}

interface WorkflowCriteriaProps {
    criteria: Criteria;
    step: WorkflowStep;
    shouldRenderContributors?: boolean;
}

const getLastStepOrder = (req: ScopeChangeRequest) =>
    req.workflowSteps
        .map(({ order }) => order)
        .reduce((prev, curr) => (prev > curr ? prev : curr), 0);

export function WorkflowCriteria({
    criteria,
    step,
    shouldRenderContributors,
}: WorkflowCriteriaProps): JSX.Element {
    const icon = getCriteriaStatus(criteria, step);
    const line = step.isCurrent ? (
        <Line color="#007079" />
    ) : (
        <Line
            color="
        #DCDCDC"
        />
    );

    const { request } = useScopeChangeContext();

    const isLastStep = step.order === getLastStepOrder(request);

    const Text = (
        <>
            <StepName>{step.name}</StepName>
            <DetailText>{criteria.valueDescription}</DetailText>
            <DetailText>{criteria.signedComment}</DetailText>
        </>
    );

    const contributors = shouldRenderContributors ? (
        <>
            {step.contributors.map((contributor) => (
                <ContributorRender key={contributor.id} contributor={contributor} step={step} />
            ))}
        </>
    ) : (
        <></>
    );

    return (
        <WorkflowStepper
            child={contributors}
            icon={icon ?? <></>}
            line={!isLastStep ? line : undefined}
            text={Text}
            actions={
                <>
                    {/* <MenuButton items={[]} buttonText={'Sign'} />
                    <IconMenu items={[]} /> */}
                </>
            }
        />
    );
}

interface ContributorProps {
    contributor: Contributor;
    step: WorkflowStep;
}

function ContributorRender({ contributor, step }: ContributorProps) {
    const canContribute = useCanContribute(contributor, step);

    return (
        <WorkflowStepper
            text={
                <>
                    <StepName>{contributor.instructionsToContributor}</StepName>
                    <DetailText>{`${contributor.person.firstName} ${contributor.person.lastName}`}</DetailText>
                    {contributor.contribution?.comment && (
                        <q>{contributor.contribution?.comment}</q>
                    )}
                </>
            }
            icon={<Icon name="check_circle_outlined" />}
            actions={
                <>
                    <MenuButton buttonText="Confirm" items={[]} />
                    <IconMenu items={[]} />
                </>
            }
        />
    );
}

function useContributorActions(
    contributor: Contributor,
    step: WorkflowStep
): {
    generateContributorActions: () => MenuItem[];
    generateMoreActions: () => MenuItem[];
} {
    const userCanContribute = useCanContribute(contributor, step);
    const { request } = useScopeChangeContext();
    const { workflowKeys } = scopeChangeMutationKeys(request.id);

    const { mutate } = useScopeChangeMutation(
        request.id,
        workflowKeys.contributeKey(step.id, contributor.id),
        submitContribution
    );

    const { workflowKeys: workflowQueryKeys } = scopeChangeQueryKeys(request.id);

    const checkContributorAccess = () =>
        canAddContributor({ requestId: request.id, stepId: step.id });
    const { data: canRemoveContributor } = useQuery(
        workflowQueryKeys.canAddContributorKey(step.id),
        checkContributorAccess
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
    return {
        generateContributorActions: makeContributorActions,
        generateMoreActions: makeMoreActions,
    };
}

function useCanContribute(contributor: Contributor, step: WorkflowStep): boolean {
    const { request } = useScopeChangeContext();
    const { workflowKeys } = scopeChangeQueryKeys(request.id);

    const checkCanContribute = () =>
        canContribute({ contributorId: contributor.id, requestId: request.id, stepId: step.id });

    const { data } = useQuery(
        workflowKeys.contributorKey(step.id, contributor.id),
        checkCanContribute
    );

    return Boolean(data);
}

const Line = styled.div<{ color: string }>`
    border-left: 1px solid ${({ color }) => color};
    height: auto;
    width: 1px;
    min-height: 26px;
    margin-right: -1px;
    height: -webkit-fill-available;
`;

const IconWrapper = styled.div`
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 14px;
`;

const GreenCircle = styled(Circle)`
    font-size: 14px;
    background: ${tokens.colors.interactive.primary__resting.hex};
`;

const GreyCircle = styled(Circle)`
    color: grey;
    border: 2px solid #6f6f6f;
`;

function getCriteriaStatus(criteria: Criteria, step: WorkflowStep) {
    switch (true) {
        case criteria.signedState === null && step.isCurrent: {
            return (
                <IconWrapper>
                    <GreenCircle />
                </IconWrapper>
            );
        }

        case criteria.signedState === null: {
            return (
                <IconWrapper>
                    <GreyCircle />
                </IconWrapper>
            );
        }

        case criteria.signedState === 'Approved': {
            return (
                <IconWrapper>
                    <Icon
                        name="check_circle_outlined"
                        color={tokens.colors.interactive.primary__resting.hex}
                    />
                </IconWrapper>
            );
        }

        case criteria.signedState === 'Rejected': {
            return (
                <IconWrapper>
                    <Icon name="close_circle_outlined" />;
                </IconWrapper>
            );
        }
    }
}

interface WorkflowStepperProps {
    icon: JSX.Element;
    text: JSX.Element;
    actions?: JSX.Element;
    line?: JSX.Element;
    child?: JSX.Element;
}

export function WorkflowStepper({
    actions,
    icon,
    line,
    text,
    child,
}: WorkflowStepperProps): JSX.Element {
    return (
        <Wrapper>
            <Inner>
                <Icons>
                    {icon}
                    {line}
                </Icons>
                <Text>
                    <span>{text}</span>
                    <br />
                    <span>{child}</span>
                </Text>
                <Buttons>{actions}</Buttons>
            </Inner>
        </Wrapper>
    );
}

const StepName = styled.div`
    font-size: 16px;
`;
const DetailText = styled.div`
    font-size: 14px;
    color: red;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    min-height: 56px;
    padding: 0.2em;
`;

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-start;
`;

const Icons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    align-items: center;
    height: 100%;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
`;

const Inner = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-start;
`;
