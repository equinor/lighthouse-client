import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

export const CompletionManagementIcon = (): JSX.Element => {
    return (
        <Icon color={tokens.colors.interactive.primary__resting.hex} name="assignment_turned_in" />
    );
};
