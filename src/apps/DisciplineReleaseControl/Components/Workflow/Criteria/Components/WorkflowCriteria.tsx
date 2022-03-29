import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';


import { useConditionalRender } from '../../../../Hooks/useConditionalRender';
import { CriteriaDetail } from './CriteriaDetail';
import { CriteriaActions } from '../../Types/actions';
import { AddContributor } from './AddContributor';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { SignWithComment } from './SignWithComment';
import { PCSPersonRoleSearch } from '../../../SearchableDropdown/PCSPersonRoleSearch';
import { TypedSelectOption } from '../../../../Api/Search/searchType';
import { IconMenu, MenuItem, MenuButton } from '../../../MenuButton';
import { useWorkflowCriteriaOptions } from '../../../../Hooks/useWorkflowCriteriaOptions';
import { useQueryClient } from 'react-query';
import { useIsWorkflowLoading } from '../../../../Hooks/React-Query/useIsWorkflowLoading';
import { useReleaseControlMutationKeyGen } from '../../../../Hooks/React-Query/useReleaseControlMutationKeyGen';
import { useReleaseControlQueryKeyGen } from '../../../../Hooks/React-Query/useReleaseControlQueryKeyGen';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { reassignCriteria, signCriteria, unsignCriteria } from '../../../../Api/Workflow';
import { ServerError } from '../../../../Api/Types/ServerError';
import { useReleaseControlMutation } from '../../../../Hooks/useReleaseControlMutation';
import { Criteria, WorkflowStep } from '../../../../Types/disciplineReleaseControl';

interface OnSignStepAction {
    action: 'Approved' | 'Rejected';
}

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
    canAddContributor: boolean;
}

export const WorkflowCriteria = ({
    step,
    criteria,
    canAddContributor,
}: WorkflowCriteriasProps): JSX.Element => {
    const [selected, setSelected] = useState<TypedSelectOption | null>(null);
    const { process, setErrorMessage } = useReleaseControlContext();
    const [signComment, setSignComment] = useState<string>('');
    const [showSignWithComment, setShowSignWithComment] = useState(false);

    const queryClient = useQueryClient();
    const { workflowKeys } = useReleaseControlMutationKeyGen(process.id);
    const { baseKey } = useReleaseControlQueryKeyGen(process.id);
    const workflowLoading = useIsWorkflowLoading();

    const { criteriaUnsignKey, criteriaReassignKey, criteriaSignKey } = workflowKeys;

    const { canReassign, canSign, canUnsign } = useWorkflowCriteriaOptions(
        process.id,
        criteria.id,
        step.id,
        setErrorMessage
    );

    function makeSignOptions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (canSign) {
            actions.push({
                label: CriteriaActions.Sign,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: () => signMutation({ action: 'Approved' }),
                isDisabled: !canSign,
            });
            actions.push({
                label: 'Sign with comment',
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowSignWithComment(true),
                isDisabled: !canSign,
            });
            if (step.order !== 0) {
                actions.push({
                    label: 'Reject',
                    icon: <Icon name="close_circle_outlined" color="grey" />,
                    onClick: () => signMutation({ action: 'Rejected' }),
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
                icon: <Icon name="assignment_user" color="grey" />,
                onClick: () => toggleReassign(),
                isDisabled: !canReassign,
            });
        }
        if (canUnsign) {
            actions.push({
                label: 'Unsign',
                onClick: () =>
                    unSignMutation({
                        criteriaId: criteria.id,
                        processId: process.id,
                        stepId: step.id,
                    }),
                isDisabled: !canUnsign,
            });
        }
        if (canAddContributor && step.isCurrent) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color="grey" />,
                onClick: () => toggleContributorSelector(),
                isDisabled: !canAddContributor,
            });
        }
        return actions;
    }

    useEffect(() => {
        if (selected) {
            reassignMutation({
                processId: process.id,
                stepId: step.id,
                criteriaId: criteria.id,
                reassign: {
                    type: `${
                        selected.type === 'functionalRole'
                            ? 'RequireProcosysFunctionalRoleSignature'
                            : 'RequireProcosysUserSignature'
                    }`,
                    value: selected.value,
                },
            });
            setSelected(null);
            setShowReassign(false);
        }
    }, [criteria.id, process.id, selected, step.id]);

    async function onSignStep({ action }: OnSignStepAction) {
        const unsignedCriterias = process.workflowSteps
            .find((x) => x.id === step.id)
            ?.criterias.filter((x) => x.signedAtUtc === null);
        const sign = async () => {
            await signCriteria(process.id, step.id, criteria.id, action, signComment).then(() => {
                queryClient.invalidateQueries(baseKey);
            });
        };
        if (
            step.contributors &&
            step.contributors.some((x) => x.contribution === null) &&
            unsignedCriterias &&
            unsignedCriterias.length === 1
        ) {
            spawnConfirmationDialog(
                'Not all contributors have responded yet, are you sure you want to continue?',
                'Warning',
                sign
            );
        } else {
            await sign();
        }
        setSignComment('');
    }

    const {
        isShowing: ReassignBarIsShowing,
        Component: ReassignBar,
        toggle: toggleReassign,
        set: setShowReassign,
    } = useConditionalRender(<PCSPersonRoleSearch selected={selected} setSelected={setSelected} />);

    const {
        Component: ContributorSelector,
        toggle: toggleContributorSelector,
        set: setShowContributor,
    } = useConditionalRender(
        <AddContributor close={() => setShowContributor(false)} step={step} />
    );

    const closeAll = () => {
        setShowSignWithComment(false);
        setShowReassign(false);
        setShowContributor(false);
        setSelected(null);
    };

    const { mutateAsync: reassignMutation } = useReleaseControlMutation(
        process.id,
        criteriaReassignKey(step.id, criteria.id),
        reassignCriteria,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    const { mutateAsync: signMutation } = useReleaseControlMutation(
        process.id,
        criteriaSignKey(step.id, criteria.id),
        onSignStep,
        {
            onError: (e: ServerError) => setErrorMessage(e),
            onSuccess: () => setSignComment(''),
        }
    );

    const { mutateAsync: unSignMutation } = useReleaseControlMutation(
        process.id,
        criteriaUnsignKey(step.id, criteria.id),
        unsignCriteria,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    return (
        <>
            <WorkflowStepViewContainer key={criteria.id}>
                {ReassignBarIsShowing ? (
                    <ReassignPadding>
                        <ReassignBar />
                    </ReassignPadding>
                ) : (
                    <CriteriaDetail criteria={criteria} step={step} />
                )}

                <Inline>
                    {!workflowLoading && makeSignOptions().length > 0 && (
                        <MenuButton
                            items={makeSignOptions()}
                            onMenuOpen={() => closeAll()}
                            buttonText="Sign"
                        />
                    )}
                    {!workflowLoading && makeMoreActions().length > 0 && (
                        <IconMenu items={makeMoreActions()} onMenuOpen={() => closeAll()} />
                    )}
                </Inline>
            </WorkflowStepViewContainer>

            <ContributorSelector />
            {showSignWithComment && (
                <SignWithComment
                    criteria={criteria}
                    step={step}
                    close={() => setShowSignWithComment(false)}
                />
            )}
        </>
    );
};

const ReassignPadding = styled.div`
    padding: 0em 0.5em;
    width: 100%;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    width: -webkit-fill-available;
    &:hover {
        background-color: ${tokens.colors.interactive.primary__selected_hover.hex};
    }
`;

const Inline = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
`;
