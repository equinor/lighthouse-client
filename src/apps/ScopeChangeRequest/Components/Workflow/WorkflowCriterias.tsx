import { useMutation } from 'react-query';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

import { Button, Icon, Progress, TextField } from '@equinor/eds-core-react';
import { Criteria, WorkflowStep } from '../../Types/scopeChangeRequest';
import { SelectOption } from '../../Api/Search/PCS';
import { reassignCriteria } from '../../Api/ScopeChange/reassignPerson';
import { useScopeChangeAccessContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { useConditionalRender } from '../../Hooks/useConditionalRender';
import { useLoading } from '../../Hooks/useLoading';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { useEffect, useState } from 'react';
import { MenuButton } from '../MenuButton/Components/MenuButton';
import { IconMenu } from '../MenuButton/Components/IconMenu';
import { CriteriaDetail } from './CriteriaDetail';
import { MenuItem } from '../MenuButton/Types/menuItem';
import { CriteriaActions } from './Types/actions';
import { useHttpClient } from '../../../../Core/Client/Hooks';
import { addContributor as postContributor } from '../../Api/addContributor';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
}

export const WorkflowCriterias = ({ step, criteria }: WorkflowCriteriasProps): JSX.Element => {
    const [person, setPerson] = useState<SelectOption | null>(null);
    const [contributor, setContributor] = useState<SelectOption | null>(null);
    const { canAddContributor } = useScopeChangeAccessContext();
    const [textField, setTextField] = useState<string | undefined>(undefined);
    const { scopeChange } = useHttpClient();

    useEffect(() => {
        if (person) {
            setPerformingAction(true);
            reassign({ type: 'RequireProcosysUserSignature', value: person.value });
            setPerson(null);
            setPerformingAction(false);
        }
    }, [person]);

    async function createContributor() {
        if (!contributor?.value || !request.currentWorkflowStep?.id || !textField) return;
        await postContributor(
            contributor.value,
            request.id,
            request.currentWorkflowStep?.id,
            scopeChange,
            textField
        );
    }

    const {
        mutateAsync,
        isLoading: contributorLoading,
        isError: contributorError,
    } = useMutation(createContributor);

    const addContributor = async () => {
        setPerformingAction(true);
        await mutateAsync();
        setPerformingAction(false);
        setTextField(undefined);
        setContributor(null);
    };

    const {
        Component: ReassignBar,
        toggle: toggleReassign,
        set: setShowReassign,
    } = useConditionalRender(<PCSPersonSearch person={person} setPerson={setPerson} />);

    const {
        Component: AddContributor,
        toggle: toggleContributorSelector,
        set: setShowContributor,
    } = useConditionalRender(<PCSPersonSearch person={contributor} setPerson={setContributor} />);

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
            <Button variant="outlined">Sign</Button>
        </div>
    );

    const closeAll = () => {
        setShowContributor(false);
        setShowCommentField(false);
        setShowReassign(false);
    };

    const { setPerformingAction, request, refetch } = useScopeChangeAccessContext();

    interface ReassignArgs {
        value: string;
        type: 'RequireProcosysUserSignature';
    }
    const reassign = async ({ value, type }: ReassignArgs) => {
        await reassignCriteria(request.id, step.id, criteria.id, {
            type: type,
            value: value,
        });
    };

    const { mutateAsync: reassignStep, isLoading } = useMutation(reassign, {
        onSuccess: async () => {
            setShowReassign(false);
            await refetch();
        },
    });

    const { Loading } = useLoading(<Progress.Dots color="primary" />, isLoading);

    const signActions: MenuItem[] = [
        {
            label: CriteriaActions.Sign,
            icon: <Icon name="check_circle_outlined" color="grey" />,
        },
        {
            label: CriteriaActions.SignWithComment,
            icon: <Icon name="comment_add" color="grey" />,
            onClick: () => toggleCommentField(),
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
        {
            label: CriteriaActions.Reject,
            icon: <Icon name="assignment_return" color="grey" />,
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
                        <Divider />
                        <IconMenu items={moreActions} onMenuOpen={() => closeAll()} />
                    </Inline>
                )}
            </WorkflowStepViewContainer>
            <Loading />
            <AddContributor />
            <CommentField />
            <ReassignBar />
        </>
    );
};

const Divider = styled.div`
    height: 9px;
    width: 0.5rem;
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
`;
