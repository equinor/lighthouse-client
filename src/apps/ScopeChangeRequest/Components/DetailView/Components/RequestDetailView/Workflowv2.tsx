import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Criteria, WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { IconMenu, MenuButton } from '../../../MenuButton';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';

export function Workflow2(): JSX.Element {
    const { request } = useScopeChangeContext();

    return (
        <>
            {request.workflowSteps.map((step) =>
                step.criterias.map((y) => <WorkflowCriteria key={y.id} criteria={y} step={step} />)
            )}
        </>
    );
}

interface WorkflowCriteriaProps {
    criteria: Criteria;
    step: WorkflowStep;
}

export function WorkflowCriteria({ criteria, step }: WorkflowCriteriaProps): JSX.Element {
    const icon = getCriteriaStatus(criteria, step);
    const line = step.isCurrent ? (
        <Line color="#007079" />
    ) : (
        <Line
            color="
        #DCDCDC"
        />
    );

    const Text = (
        <>
            <StepName>{step.name}</StepName>
            <DetailText>{criteria.valueDescription}</DetailText>
            <DetailText>{criteria.signedComment}</DetailText>
        </>
    );

    return (
        <WorkflowStepper
            child={
                step.isCompleted ? (
                    <>
                        <WorkflowStepper
                            icon={icon ?? <></>}
                            text={
                                <div>
                                    <div>Some contributor</div>
                                    <div>I signed this</div>
                                </div>
                            }
                        />
                        <WorkflowStepper
                            icon={icon ?? <></>}
                            text={
                                <div>
                                    <div>Some contributor</div>
                                    <div>I signed this</div>
                                </div>
                            }
                        />
                        <WorkflowStepper
                            icon={icon ?? <></>}
                            text={
                                <div>
                                    <div>Some contributor</div>
                                    <div>I signed this</div>
                                </div>
                            }
                            actions={
                                <>
                                    <MenuButton buttonText="Confirm" items={[]} />
                                    <IconMenu items={[]} />
                                </>
                            }
                        />
                    </>
                ) : (
                    <></>
                )
            }
            icon={icon ?? <></>}
            line={line}
            text={Text}
            actions={
                <>
                    <MenuButton items={[]} buttonText={'Sign'} />
                    <IconMenu items={[]} />
                </>
            }
        />
    );
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
            <LeftSection>
                <Icons>
                    {icon}
                    {line}
                </Icons>
                <Text>
                    <span>{text}</span>
                    <span>{child}</span>
                </Text>
            </LeftSection>
            <Buttons>{actions}</Buttons>
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

const LeftSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
`;
