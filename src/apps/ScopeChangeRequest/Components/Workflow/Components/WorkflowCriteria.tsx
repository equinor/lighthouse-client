import { useMutation } from 'react-query';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

import { Icon, Progress } from '@equinor/eds-core-react';
import { Criteria, WorkflowStep } from '../../../Types/scopeChangeRequest';
import { reassignCriteria, unsignCriteria } from '../../../Api/ScopeChange/Workflow';
import { useScopeChangeAccessContext } from '../../Sidesheet/Context/useScopeChangeAccessContext';
import { useConditionalRender } from '../../../Hooks/useConditionalRender';
import { useLoading } from '../../../Hooks/useLoading';
import { useEffect, useState } from 'react';
import { MenuButton } from '../../MenuButton/Components/MenuButton';
import { IconMenu } from '../../MenuButton/Components/IconMenu';
import { CriteriaDetail } from './CriteriaDetail';
import { MenuItem } from '../../MenuButton/Types/menuItem';
import { CriteriaActions } from '../Types/actions';
import { AddContributor } from './AddContributor';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { signCriteria } from '../../../Api/ScopeChange/Workflow';
import { SignWithComment } from './SignWithComment';
import { PCSPersonRoleSearch } from '../../SearchableDropdown/PCSPersonRoleSearch';
import { TypedSelectOption } from '../../../Api/Search/searchType';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
}

export const WorkflowCriteria = ({ step, criteria }: WorkflowCriteriasProps): JSX.Element => {
    const [selected, setSelected] = useState<TypedSelectOption | null>(null);

    const { request, notifyChange } = useScopeChangeAccessContext();
    const [signComment, setSignComment] = useState<string>('');

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

    async function onSignStep() {
        if (request.currentWorkflowStep && request.currentWorkflowStep.criterias.length > 0) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria(request.id, currentStepId, criteria.id, signComment);
            };
            if (
                request.currentWorkflowStep.contributors &&
                request.currentWorkflowStep.contributors.some((x) => x.contribution === null) &&
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
    }

    const {
        Component: ReassignBar,
        toggle: toggleReassign,
        set: setShowReassign,
    } = useConditionalRender(<PCSPersonRoleSearch selected={selected} setSelected={setSelected} />);

    const {
        Component: ContributorSelector,
        toggle: toggleContributorSelector,
        set: setShowContributor,
    } = useConditionalRender(<AddContributor onCancel={() => setShowContributor(false)} />);

    const {
        Component: SignWithCommentComp,
        toggle: toggleSignWithComment,
        set: setShowSignWithComment,
    } = useConditionalRender(
        <SignWithComment criteria={criteria} onCancel={() => setShowSignWithComment(false)} />
    );

    const closeAll = () => {
        setShowSignWithComment(false);
        setShowReassign(false);
        setShowContributor(false);
        setSelected(null);
    };

    const reject = async () => {
        await unsignCriteria(request.id, step.id, criteria.id);
    };

    const { mutateAsync: reassignMutation, isLoading } = useMutation(reassignCriteria, {
        onSettled: notifyChange,
    });
    const { mutateAsync: rejectMutation } = useMutation(reject, { onSettled: notifyChange });

    const { mutateAsync: signMutation, isLoading: signLoading } = useMutation(onSignStep, {
        onSettled: notifyChange,
    });

    const { Loading } = useLoading(<Progress.Dots color="primary" />, isLoading || signLoading);

    const signActions: MenuItem[] = [
        {
            label: CriteriaActions.Sign,
            icon: <Icon name="check_circle_outlined" color="grey" />,
            onClick: () => signMutation(),
        },
        {
            label: CriteriaActions.SignWithComment,
            icon: <Icon name="comment_add" color="grey" />,
            onClick: () => toggleSignWithComment(),
        },
        {
            label: CriteriaActions.Reject,
            icon: <Icon name="assignment_return" color="grey" />,
            onClick: () => rejectMutation(),
        },
    ];

    const moreActions: MenuItem[] = [
        {
            label: CriteriaActions.Reassign,
            icon: <Icon name="assignment_user" color="grey" />,
            onClick: () => toggleReassign(),
        },
        {
            label: CriteriaActions.AddContributor,
            icon: <Icon name="group_add" color="grey" />,
            onClick: () => toggleContributorSelector(),
        },
    ];

    return (
        <>
            <WorkflowStepViewContainer key={criteria.id}>
                <CriteriaDetail criteria={criteria} step={step} />

                {step.isCurrent && criteria.signedState === null && (
                    <Inline>
                        <MenuButton
                            items={signActions}
                            onMenuOpen={() => closeAll()}
                            buttonText="Sign"
                        />
                        <IconMenu items={moreActions} onMenuOpen={() => closeAll()} />
                    </Inline>
                )}
            </WorkflowStepViewContainer>
            <Loading />
            <ContributorSelector />
            <SignWithCommentComp />
            <ReassignBar />
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
