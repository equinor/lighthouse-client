import { tokens } from '@equinor/eds-tokens';

export const FilterFilled = (): JSX.Element => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.75994 13C9.75994 13 6.02994 8.2 4.00994 5.61C3.49994 4.95 3.96994 4 4.79994 4H18.7099C19.5399 4 20.0099 4.95 19.4999 5.61C17.4799 8.2 13.7599 13 13.7599 13V19C13.7599 19.55 13.3099 20 12.7599 20H10.7599C10.2099 20 9.75994 19.55 9.75994 19V13Z"
            fill={tokens.colors.interactive.primary__resting.hex}
        />
    </svg>
);
