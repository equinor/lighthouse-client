import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Icon, Progress } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Criteria, WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { reassignCriteria, unsignCriteria } from '../../../../Api/ScopeChange/Workflow';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useConditionalRender } from '../../../../Hooks/useConditionalRender';
import { useLoading } from '../../../../Hooks/useLoading';
import { useScopeChangeMutation } from '../../../../Hooks/useScopechangeMutation';
import { CriteriaDetail } from './CriteriaDetail';
import { CriteriaActions } from '../../Types/actions';
import { AddContributor } from './AddContributor';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { signCriteria } from '../../../../Api/ScopeChange/Workflow';
import { SignWithComment } from './SignWithComment';
import { PCSPersonRoleSearch } from '../../../SearchableDropdown/PCSPersonRoleSearch';
import { TypedSelectOption } from '../../../../Api/Search/searchType';
import { IconMenu, MenuItem, MenuButton } from '../../../MenuButton';
import { canReassign, canSign, canUnsign } from '../../../../Api/ScopeChange/Access';
import { ServerError } from '../../../../Api/ScopeChange/Types/ServerError';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
    canAddContributor: boolean;
}

export const WorkflowCriteria = ({ step, criteria, canAddContributor }: WorkflowCriteriasProps): JSX.Element => {
    const [selected, setSelected] = useState<TypedSelectOption | null>(null);
    const { request, setErrorMessage } = useScopeChangeContext();
    const [signComment, setSignComment] = useState<string>('');
    const [showSignWithComment, setShowSignWithComment] = useState(false);

    const checkCanSign = () => canSign({ criteriaId: criteria.id, requestId: request.id, stepId: step.id })
    const { data: userCanSign } = useQuery(`step/${step.id}/criteria/${criteria.id}`, checkCanSign, { refetchOnWindowFocus: false });
    const checkCanReassign = () => canReassign({ criteriaId: criteria.id, requestId: request.id, stepId: step.id })
    const { data: userCanReassign } = useQuery(`step/${step.id}/criteria/${criteria.id}`, checkCanReassign, { refetchOnWindowFocus: false });
    const checkCanUnsign = () => canUnsign({ criteriaId: criteria.id, requestId: request.id, stepId: step.id });
    const { data: userCanUnsign } = useQuery(`step/${step.id}/criteria/${criteria.id}`, checkCanUnsign, { refetchOnWindowFocus: false });


    function makeSignOptions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (userCanSign) {
            actions.push({
                label: CriteriaActions.Sign,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: () => signMutation({ action: 'Approved' }),
                isDisabled: !userCanSign
            });
            actions.push({
                label: 'Sign with comment',
                icon: <Icon name="comment_add" color="grey" />,
                onClick: () => setShowSignWithComment(true),
                isDisabled: !userCanSign
            });
            if (step.order !== 0) {
                actions.push({
                    label: 'Reject',
                    icon: <Icon name="assignment_return" color="grey" />,
                    onClick: () => signMutation({ action: 'Rejected' }),
                    isDisabled: !userCanSign
                });
            }
        }
        return actions;
    }

    function makeMoreActions(): MenuItem[] {
        const actions: MenuItem[] = []
        if (userCanReassign) {
            actions.push({
                label: CriteriaActions.Reassign,
                icon: <Icon name="assignment_user" color="grey" />,
                onClick: () => toggleReassign(),
                isDisabled: !userCanReassign
            });
        }
        if (userCanUnsign) {
            actions.push({
                label: 'Unsign',
                onClick: () =>
                    unSignMutation({
                        criteriaId: criteria.id,
                        requestId: request.id,
                        stepId: step.id,
                    }),
                isDisabled: !userCanUnsign
            });
        }
        if (canAddContributor && step.isCurrent) {
            actions.push({
                label: CriteriaActions.AddContributor,
                icon: <Icon name="group_add" color="grey" />,
                onClick: () => toggleContributorSelector(),
                isDisabled: !canAddContributor
            });
        }
        return actions;
    }


    useEffect(() => {
        if (selected) {
            reassignMutation({
                requestId: request.id,
                stepId: step.id,
                criteriaId: criteria.id,
                reassign: {
                    type: `${selected.type === 'functionalRole'
                        ? 'RequireProcosysFunctionalRoleSignature'
                        : 'RequireProcosysUserSignature'
                        }`,
                    value: selected.value,
                },
            });
            setSelected(null);
            setShowReassign(false);
        }
    }, [selected]);

    interface OnSignStepAction {
        action: 'Approved' | 'Rejected';
    }
    async function onSignStep({ action }: OnSignStepAction) {

        const unsignedCriterias = request.workflowSteps.find((x) => x.id === step.id)?.criterias.filter(
            (x) => x.signedAtUtc === null
        );
        const sign = async () => {
            await signCriteria(request.id, step.id, criteria.id, action, signComment);
        };
        if (
            step.contributors &&
            step.contributors.some((x) => x.contribution === null) && unsignedCriterias &&
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
    } = useConditionalRender(<AddContributor onCancel={() => setShowContributor(false)} />);

    const closeAll = () => {
        setShowSignWithComment(false);
        setShowReassign(false);
        setShowContributor(false);
        setSelected(null);
    };

    const { mutateAsync: reassignMutation, isLoading } = useScopeChangeMutation(reassignCriteria, {
        onError: (e: ServerError) => setErrorMessage(e),
    });

    const { mutateAsync: signMutation, isLoading: signLoading, error } = useScopeChangeMutation(
        onSignStep,
        {
            onError: (e: ServerError) => setErrorMessage(e),
            onSuccess: () => setSignComment("")
        }
    );

    useEffect(() => {
        console.log(error)
    }, [error])

    const { mutateAsync: unSignMutation, isLoading: unSignLoading } = useScopeChangeMutation(
        unsignCriteria,
        {
            onError: (e: ServerError) => setErrorMessage(e),

        }
    );

    const { Loading } = useLoading(
        <Progress.Dots color="primary" />,
        isLoading || signLoading || unSignLoading
    );

    return (
        <>
            <WorkflowStepViewContainer key={criteria.id}>
                {ReassignBarIsShowing ? (
                    <ReassignBar />
                ) : (
                    <CriteriaDetail criteria={criteria} step={step} />
                )}

                <Inline>
                    <MenuButton
                        items={makeSignOptions()}
                        onMenuOpen={() => closeAll()}
                        buttonText="Sign"
                    />

                    <IconMenu items={makeMoreActions()} onMenuOpen={() => closeAll()} />
                </Inline>
            </WorkflowStepViewContainer>
            <Loading />
            <ContributorSelector />
            {showSignWithComment && (
                <SignWithComment
                    criteria={criteria}
                    onCancel={() => setShowSignWithComment(false)}
                />
            )}
        </>
    );
};

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
