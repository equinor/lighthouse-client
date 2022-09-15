import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { CenterIcon } from './cells.styles';

interface PendingContributionsProps {
    hasPending: boolean;
}
export const PendingContributions = ({ hasPending }: PendingContributionsProps) => (
    <>
        {hasPending && (
            <CenterIcon>
                <Icon color={tokens.colors.text.static_icons__default.hex} name="group" />
            </CenterIcon>
        )}
    </>
);
