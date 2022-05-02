import { Button, Icon, Tabs } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

import { useGetScopeChangeRequest } from '../../../hooks/queries/useGetScopeChangeRequest';
import { useEdsTabs } from '../../../../../hooks/edsTabs/useEdsTabs';
import { useScopeChangeAccess } from '../../../hooks/queries/useScopeChangeAccess';
import { useScopeChangeMutationWatcher } from '../../../hooks/observers/useScopeChangeMutationWatcher';
import { Contributor, Criteria, ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { ScopeChangeErrorBanner } from '../../ErrorBanner/ErrorBanner';
import { SidesheetBanner } from '../SidesheetBanner/SidesheetBanner';
import { LogTabTitle, LogTab } from '../Tabs/Log';
import { RequestTabTitle, RequestTab } from '../Tabs/Request';
import { WorkOrderTabTitle, WorkOrderTab } from '../Tabs/WorkOrders';
import { useOctopusErrorHandler } from '../../../hooks/observers/useOctopusErrorHandler';
import { SidesheetTabList } from './SidesheetWrapper.styles';
import styled from 'styled-components';
import { SidesheetApi } from '../../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { ScopeChangeRequestEditForm } from '../../Form/ScopeChangeRequestEditForm';
import { useSidesheetEffects } from '../../../hooks/sidesheet/useSidesheetEffects';
import { deref, swap, useAtom } from '@dbeining/react-atom';
import { sideSheetEditModeAtom } from '../../../Atoms/editModeAtom';
import { scopeChangeAtom } from '../../../Atoms/scopeChangeAtom';
import { tokens } from '@equinor/eds-tokens';
import { canAddContributor } from '../../../api/ScopeChange/Access';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useWorkflowSigning } from '../../../hooks/mutations/useWorkflowSigning';
import { useWorkflowCriteriaOptions } from '../../../hooks/queries/useWorkflowCriteriaOptions';
import { MenuItem, MenuButton, IconMenu } from '../../MenuButton';
import { WorkflowIcon } from '../../Workflow/Components/WorkflowIcon';
import { actionWithCommentAtom } from '../../Workflow/Criteria';
import { AddContributor } from '../../Workflow/Criteria/Components/AddContributor';
import { CriteriaStatus } from '../../Workflow/Criteria/Components/CriteriaDetail';
import { SignWithComment } from '../../Workflow/Criteria/Components/SignWithComment/SignWithComment';
import { CriteriaActions } from '../../Workflow/Types/actions';
import { convertUtcToLocalDate, dateToDateTimeFormat } from '../../Workflow/Utils/dateFormatting';

interface SidesheetWrapperProps {
    item: ScopeChangeRequest;
    actions: SidesheetApi;
}

export function SidesheetWrapper({ item, actions }: SidesheetWrapperProps): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    const { activeTab, handleChange } = useEdsTabs(3);

    const request = useGetScopeChangeRequest(item.id, item);

    const requestAccess = useScopeChangeAccess(item.id);

    const toggleEditMode = () => swap(sideSheetEditModeAtom, (s) => !s);

    useSidesheetEffects(actions, toggleEditMode, item.id);

    useEffect(() => {
        swap(sideSheetEditModeAtom, () => false);
    }, [request?.id]);

    useEffect(() => {
        swap(scopeChangeAtom, () => ({
            actions,
            request: request ?? item,
            requestAccess,
        }));
    }, [request, requestAccess, item]);

    const editMode = useAtom(sideSheetEditModeAtom);

    if (Object.keys(deref(scopeChangeAtom).request).length < 2) {
        return <></>;
    }

    return (
        <Wrapper>
            <ScopeChangeErrorBanner />
            {editMode ? (
                <ScopeChangeRequestEditForm request={request ?? item} close={toggleEditMode} />
            ) : (
                <>
                    <SidesheetBanner />
                    <Tabs activeTab={activeTab} onChange={handleChange}>
                        <SidesheetTabList>
                            <Tabs.Tab>
                                <RequestTabTitle />
                            </Tabs.Tab>
                            <Tabs.Tab>
                                <WorkOrderTabTitle />
                            </Tabs.Tab>
                            <Tabs.Tab>
                                <LogTabTitle />
                            </Tabs.Tab>
                        </SidesheetTabList>
                        <TabList>
                            <Tab>
                                <RequestTab />
                            </Tab>
                            <Tab>{activeTab === 1 && <WorkOrderTab />}</Tab>
                            <Tab>{activeTab === 2 && <LogTab />}</Tab>
                        </TabList>
                    </Tabs>
                </>
            )}
        </Wrapper>
    );
}

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;

const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 90%;
`;

function statusFunc(criteria: Criteria, isCurrentStep: boolean): CriteriaStatus {
    if (!criteria.signedState) {
        return isCurrentStep ? 'Active' : 'Inactive';
    } else if (criteria.signedState === 'Approved') {
        return 'Approved';
    } else {
        return 'Rejected';
    }
}

export const WorkflowWithLines = () => {
    const { request } = useScopeChangeContext();
    return (
        <>
            {request.workflowSteps.map(
                ({ criterias, contributors, name, order, isCurrent, id }, index) => {
                    const stepIndex = index;
                    return (
                        <>
                            {criterias.map((criteria, index) => {
                                const stepStatus = statusFunc(criteria, isCurrent);

                                const shouldRenderContributors =
                                    criterias.length - 1 === index && contributors.length > 0;

                                const lineHeight = shouldRenderContributors
                                    ? `${2 + contributors.length * 5}em`
                                    : '2em';

                                return (
                                    <CriteriaRender
                                        stepId={id}
                                        key={criteria.id}
                                        contributors={contributors}
                                        criteria={criteria}
                                        isLastCriteria={criterias.length - 1 === index}
                                        lineHeight={lineHeight}
                                        name={name}
                                        order={order}
                                        stepIndex={stepIndex}
                                        stepStatus={stepStatus}
                                    />
                                );
                            })}
                        </>
                    );
                }
            )}
        </>
    );
};

interface CriteriaRenderProps {
    name: string;
    criteria: Criteria;
    contributors: Contributor[];
    lineHeight: string;
    stepIndex: number;
    stepStatus: CriteriaStatus;
    order: number;
    isLastCriteria: boolean;
    stepId: string;
}

const CriteriaRender = ({
    isLastCriteria,
    name,
    contributors,
    criteria,
    lineHeight,
    stepIndex,
    stepStatus,
    order,
    stepId,
}: CriteriaRenderProps) => {
    const { request } = useScopeChangeContext();

    const { canReassign, canSign, canUnsign } = useWorkflowCriteriaOptions(
        request.id,
        criteria.id,
        stepId
    );

    const signMutation = useWorkflowSigning({
        criteriaId: criteria.id,
        stepId: stepId,
        requestId: request.id,
    });

    const setShowSendBackWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Rejected' as const,
            closeRequest: false,
            buttonText: 'Send back',
            criteriaId: criteria.id,
            stepId: stepId,
        }));

    const setShowSignWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Approved' as const,
            closeRequest: false,
            buttonText: 'Sign',
            criteriaId: criteria.id,
            stepId: stepId,
        }));

    const setShowRejectWithComment = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'Rejected' as const,
            closeRequest: true,
            buttonText: 'Reject',
            criteriaId: criteria.id,
            stepId: stepId,
        }));

    const setShowContributorPicker = () =>
        swap(actionWithCommentAtom, () => ({
            action: 'AddContributor' as const,
            buttonText: 'Add',
            closeRequest: false,
            criteriaId: criteria.id,
            stepId: stepId,
        }));

    const iconGrey = tokens.colors.text.static_icons__tertiary.hex;

    function makeSignOptions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (canSign) {
            actions.push({
                label: CriteriaActions.Sign,
                icon: <Icon name="check_circle_outlined" color={iconGrey} />,
                onClick: () =>
                    signMutation({ action: 'Approved', closeRequest: false, comment: '' }),
                isDisabled: !canSign,
            });
            actions.push({
                label: 'Sign with comment',
                icon: <Icon name="comment_add" color={iconGrey} />,
                onClick: setShowSignWithComment,
                isDisabled: !canSign,
            });

            actions.push({
                label: 'Reject with comment',
                onClick: setShowRejectWithComment,
                icon: <Icon name="close_circle_outlined" color={iconGrey} />,
                isDisabled: !canSign,
            });
            if (order !== 0) {
                actions.push({
                    label: 'Send back with comment',
                    icon: <Icon name="undo" color={iconGrey} />,
                    onClick: setShowSendBackWithComment,
                    isDisabled: !canSign,
                });
            }
        }
        return actions;
    }

    function makeMoreActions(): MenuItem[] {
        const actions: MenuItem[] = [];
        if (canReassign) {
            actions.push({
                label: CriteriaActions.Reassign,
                icon: <Icon name="assignment_user" color={iconGrey} />,
                // onClick: toggleReassign,
                isDisabled: !canReassign,
            });
        }
        if (canUnsign) {
            actions.push({
                label: 'Unsign',
                // onClick: () =>
                //     unSignMutation({
                //         criteriaId: criteria.id,
                //         requestId: request.id,
                //         stepId: stepId,
                //     }),
                isDisabled: !canUnsign,
            });
        }
        if (canAddContributor) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color={iconGrey} />,
                onClick: () => setShowAddContributor(true),
                // onClick: toggleContributorSelector,
                isDisabled: !canAddContributor,
            });
        }
        return actions;
    }

    const state = useAtom(actionWithCommentAtom);

    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
    const formattedDate = dateToDateTimeFormat(date);

    const [showAddContributor, setShowAddContributor] = useState(false);

    return (
        <WorkflowWrapper key={criteria.id}>
            <WorklowIconAndLine rowSpan={contributors.length + 1}>
                <WorkflowIcon status={stepStatus} number={order + 1} />

                {stepIndex !== request.workflowSteps.length - 1 && (
                    <VerticalLine height={lineHeight} />
                )}
            </WorklowIconAndLine>
            <WorkflowRow rowNumber={1}>
                <RowContent>
                    {state && state.criteriaId === criteria.id ? (
                        <>
                            {state.action === 'Approved' || state.action === 'Rejected' ? (
                                <SignWithComment
                                    action={state.action}
                                    buttonText={state.buttonText}
                                    closeRequest={state.closeRequest}
                                    criteriaId={state.criteriaId}
                                    stepId={state.stepId}
                                />
                            ) : (
                                <p></p>
                            )}
                        </>
                    ) : (
                        <>
                            <span>
                                <div>{name}</div>
                                {criteria.signedAtUtc ? (
                                    <DetailText>
                                        <div>{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
                                        {criteria.signedComment && <q>{criteria.signedComment}</q>}
                                    </DetailText>
                                ) : (
                                    <DetailText>{criteria.valueDescription}</DetailText>
                                )}
                            </span>
                            <CriteriaActionBar
                                makeMoreActions={makeMoreActions}
                                makeSignOptions={makeSignOptions}
                            />
                        </>
                    )}
                </RowContent>
            </WorkflowRow>
            {showAddContributor && (
                <WorkflowRow rowNumber={2}>
                    <AddContributor close={() => void 0} stepId={stepId} />
                </WorkflowRow>
            )}
            {isLastCriteria && (
                <>
                    {contributors.map((contributor, index) => (
                        <WorkflowRow key={contributor.id} rowNumber={2 + index}>
                            <ContributorRender key={contributor.id} contributor={contributor} />
                        </WorkflowRow>
                    ))}
                </>
            )}
        </WorkflowWrapper>
    );
};
const DetailText = styled.div`
    font-size: 14px;
`;

interface CriteriaActionBarProps {
    makeSignOptions: () => MenuItem[];
    makeMoreActions: () => MenuItem[];
}

const CriteriaActionBar = ({ makeMoreActions, makeSignOptions }: CriteriaActionBarProps) => {
    return (
        <ButtonContainer>
            {makeSignOptions().length > 0 && (
                <MenuButton items={makeSignOptions()} buttonText="Sign" />
            )}
            {makeMoreActions().length > 0 && <IconMenu items={makeMoreActions()} />}
        </ButtonContainer>
    );
};

const VerticalLine = styled.div<{ height: string }>`
    border-left: 1px solid ${tokens.colors.interactive.primary__resting.hex};
    height: ${({ height }) => height};
    width: 1px;
`;

const RowContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const ValueDescription = styled.div`
    color: #3d3d3d;
    font-size: 14px;
`;

const ButtonContainer = styled.span`
    display: flex;
    align-items: center;
`;

interface ContributorRenderProps {
    contributor: Contributor;
}

const ContributorRender = ({ contributor }: ContributorRenderProps) => {
    return (
        <WorkflowWrapper>
            <WorkflowIcon status={'Active'} number={'#'} />
            <WorkflowRow rowNumber={1}>
                <RowContent>
                    <FlexColumn>
                        <span>{contributor.instructionsToContributor}</span>
                        <span>
                            {contributor.person.firstName} {contributor.person.lastName}
                        </span>
                    </FlexColumn>
                    <ButtonContainer>
                        <Button>Sign</Button>
                        <IconMenu items={[]} />
                    </ButtonContainer>
                </RowContent>
            </WorkflowRow>
        </WorkflowWrapper>
    );
};

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const WorklowIconAndLine = styled.div<{ rowSpan: number }>`
    grid-column: col / span 1;
    grid-row: row / span ${({ rowSpan }) => rowSpan};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const WorkflowRow = styled.div<{ rowNumber: number }>`
    border-radius: 5px;
    font-size: 16px;
    grid-column: col 2 / span 3;
    grid-row: row ${({ rowNumber }) => rowNumber};
`;

const WorkflowWrapper = styled.div`
    display: grid;
    column-gap: 10px;
    grid-template-columns: [col] 24px [col] 100px [col] auto [col] auto;
    grid-template-rows: [row] auto [row] auto [row];
    background-color: #fff;
    color: #444;
    padding: 3px 0px;
`;
