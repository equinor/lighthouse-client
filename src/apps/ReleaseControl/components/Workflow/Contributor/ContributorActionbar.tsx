import { Icon } from '@equinor/eds-core-react';
import { useQuery, useQueryClient } from 'react-query';

import { ButtonContainer } from './contributor.styles';
import { IconMenu, MenuButton, MenuItem } from '@equinor/overlay-menu';
import { Contributor } from '../../../types/releaseControl';
import { useReleaseControlContext } from '../../../hooks/useReleaseControlContext';
import { releaseControlMutationKeys } from '../../../queries/releaseControlMutationKeys';
import { submitContribution } from '../../../api/releaseControl/Workflow';
import { releaseControlQueries } from '../../../queries/queries';
import { removeContributor } from '../../../api/releaseControl/Workflow/removeContributor';
import { ContributorActions } from '../Types/actions';
import { useReleaseControlMutation } from '../../../hooks/useReleaseControlMutation';

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
    const requestId = useReleaseControlContext(({ releaseControl }) => releaseControl.id);
    const { workflowKeys: workflowMutationKeys } = releaseControlMutationKeys(requestId);

    const { mutate } = useReleaseControlMutation(
        requestId,
        workflowMutationKeys.contributeKey(stepId, contributor.id),
        submitContribution
    );

    const { canAddContributorQuery, canContributeQuery } = releaseControlQueries.workflowQueries;
    const { data: canRemoveContributor } = useQuery(canAddContributorQuery(requestId, stepId));

    const queryClient = useQueryClient();

    const { data: userCanContribute } = useQuery(
        canContributeQuery(requestId, stepId, contributor.id)
    );

    const cancelNewOptionsCall = async () => {
        await queryClient.cancelQueries(
            canContributeQuery(requestId, stepId, contributor.id).queryKey
        );
    };

    const { mutate: removeContributorAsync } = useReleaseControlMutation(
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
