import { tokens } from '@equinor/eds-tokens';

const primaryResting = tokens.colors.interactive.primary__resting.hex;

interface CommPkgIconProps {
    /**
     * From top-left to bottom-right
     * I.E ["orange", "orange", "orange", "orange"]
     */
    colors?: string[];
}

export const CommPkgIcon = ({ colors = [] }: CommPkgIconProps): JSX.Element => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.5 20.5866L4 18.2925V10.0758L10.5 13.1346V20.5866Z"
            fill={colors.at(2) ?? primaryResting}
            stroke={colors.at(2) ?? primaryResting}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M14.5 20.5866L21 18.2925V10.0758L14.5 13.1346V20.5866Z"
            fill={colors.at(3) ?? primaryResting}
            stroke={colors.at(3) ?? primaryResting}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M10.5 8.92422L5.4782 6.56102L10.5 4.49322V8.92422Z"
            fill={colors.at(0) ?? primaryResting}
            stroke={colors.at(0) ?? primaryResting}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M14.5 8.92422L19.5218 6.56102L14.5 4.49322V8.92422Z"
            fill={colors.at(1) ?? primaryResting}
            stroke={colors.at(1) ?? primaryResting}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M7.32486 18.596C8.34181 18.596 8.99556 18.212 9.45561 17.62C9.49596 17.564 9.47982 17.5 9.40718 17.444L8.8745 17.012C8.79379 16.94 8.72922 16.956 8.66465 17.028C8.38216 17.388 7.99475 17.636 7.32486 17.636C6.27563 17.636 5.5573 16.796 5.5573 15.7C5.5573 14.604 6.27563 13.764 7.32486 13.764C7.8979 13.764 8.34988 14.004 8.72115 14.396C8.78571 14.468 8.85835 14.468 8.92292 14.404L9.45561 13.876C9.51211 13.812 9.52018 13.732 9.44754 13.66C8.93906 13.14 8.30952 12.804 7.32486 12.804C5.69451 12.804 4.5 13.956 4.5 15.7C4.5 17.444 5.69451 18.596 7.32486 18.596Z"
            fill="white"
        />
    </svg>
);
