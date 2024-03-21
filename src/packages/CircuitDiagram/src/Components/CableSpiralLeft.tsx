import { tokens } from '@equinor/eds-tokens';

interface CableSpiralLeftProps {
  isolated: boolean;
}

export const CableSpiralLeft = ({ isolated }: CableSpiralLeftProps): JSX.Element => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.5 4.5C0.5 6.98535 2.51477 9 5 9H9.5V8H5C3.06702 8 1.5 6.43262 1.5 4.5C1.5 2.56738 3.06702 1 5 1C6.93298 1 8.5 2.56738 8.5 4.5H9.5C9.5 2.01465 7.48523 0 5 0C2.51477 0 0.5 2.01465 0.5 4.5Z"
        fill={
          isolated
            ? tokens.colors.interactive.warning__resting.hex
            : tokens.colors.text.static_icons__default.hex
        }
      />
    </svg>
  );
};
