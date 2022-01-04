import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

export const QualityIcon = (): JSX.Element => {
    return <Icon color={tokens.colors.interactive.primary__resting.hex} name="star_outlined" />;
};
