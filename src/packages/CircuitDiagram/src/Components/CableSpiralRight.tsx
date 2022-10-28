import { tokens } from '@equinor/eds-tokens';

interface CableSpiralRightProps {
    isolated: boolean;
}

export const CableSpiralRight = ({ isolated }: CableSpiralRightProps): JSX.Element => {
    return (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9 4.5C9 6.98535 6.98523 9 4.5 9H0V8H4.5C6.43298 8 8 6.43262 8 4.5C8 2.56738 6.43298 1 4.5 1C2.56702 1 1 2.56738 1 4.5H0C0 2.01465 2.01477 0 4.5 0C6.98523 0 9 2.01465 9 4.5Z"
                fill={
                    isolated
                        ? tokens.colors.interactive.warning__resting.hex
                        : tokens.colors.text.static_icons__default.hex
                }
            />
        </svg>
    );
};
