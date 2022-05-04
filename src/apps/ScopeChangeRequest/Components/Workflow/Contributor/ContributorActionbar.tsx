import { Icon } from '@equinor/eds-core-react';
import { useQuery, useQueryClient } from 'react-query';

import { removeContributor } from '../../../api/ScopeChange/Workflow/removeContributor';
import { ContributorActions } from '../Types/actions';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { useScopeChangeMutation } from '../../../hooks/React-Query/useScopechangeMutation';
import { scopeChangeQueries } from '../../../keys/queries';
import { scopeChangeMutationKeys } from '../../../keys/scopeChangeMutationKeys';
import { Contributor } from '../../../types/scopeChangeRequest';
import { submitContribution } from '../../../api/ScopeChange/Workflow';
import { ButtonContainer } from './contributor.styles';
import { IconMenu, MenuButton, MenuItem } from '@equinor/overlay-menu';

interface ContributorActionBarProps {
    stepId: string;
    contributor: Contributor;
    setShowCommentField: () => void;
}

export const ContributorActionBar = ({
    stepId,
    contributor,
    setShowCommentField,
}: ContributorActionBarProps): JSX.Element => {
    const requestId = useScopeChangeContext((s) => s.request.id);
    const { workflowKeys: workflowMutationKeys } = scopeChangeMutationKeys(requestId);

    const { mutate } = useScopeChangeMutation(
        requestId,
        workflowMutationKeys.contributeKey(stepId, contributor.id),
        submitContribution
    );

    const { canAddContributorQuery } = scopeChangeQueries.workflowQueries;
    const { data: canRemoveContributor } = useQuery(canAddContributorQuery(requestId, stepId));

    const queryClient = useQueryClient();

    const { canContributeQuery } = scopeChangeQueries.workflowQueries;

    const { data: userCanContribute } = useQuery(
        canContributeQuery(requestId, stepId, contributor.id)
    );

    const cancelNewOptionsCall = async () => {
        await queryClient.cancelQueries(
            canContributeQuery(requestId, stepId, contributor.id).queryKey
        );
    };

    const { mutate: removeContributorAsync } = useScopeChangeMutation(
        requestId,
        workflowMutationKeys.deleteContributorKey(stepId),
        removeContributor,
        {
            onSuccess: () => {
                cancelNewOptionsCall();
            },
        }
    );

    function makeContributorActions(): MenuItem[] {
        const actions: MenuItem[] = [];

        if (userCanContribute && contributor.contribution === null) {
            actions.push({
                label: ContributorActions.Confirm,
                icon: <Icon name="check_circle_outlined" color="grey" />,
                onClick: () => {
                    mutate({
                        contributorId: contributor.id,
                        requestId: requestId,
                        stepId: stepId,
                        suggestion: 'SuggestApproval',
                        comment: '',
                    });
                },
                isDisabled: !userCanContribute,
            });
            actions.push({
                label: ContributorActions.ConfirmWithComment,
                icon: <Icon name="comment_add" color="grey" />,
                onClick: setShowCommentField,
                isDisabled: !userCanContribute,
            });
        }
        return actions;
    }

    function makeMoreActions(): MenuItem[] {
        const options: MenuItem[] = [];

        if (canRemoveContributor) {
            options.push({
                label: 'Remove contributor',
                isDisabled: !canRemoveContributor,
                onClick: () =>
                    removeContributorAsync({
                        contributorId: contributor.id,
                        requestId: requestId,
                        stepId: stepId,
                    }),
            });
        }

        if (userCanContribute && contributor.contribution) {
            options.push({
                label: 'Update with comment',
                icon: <Icon name="comment_add" color="grey" />,
                onClick: setShowCommentField,
                isDisabled: !userCanContribute,
            });
        }

        return options;
    }

    return (
        <ButtonContainer>
            {makeContributorActions().length > 0 && (
                <MenuButton items={makeContributorActions()} buttonText={'Confirm'} />
            )}
            {makeMoreActions().length > 0 && <IconMenu items={makeMoreActions()} />}
        </ButtonContainer>
    );
};
