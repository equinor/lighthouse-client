import { tokens } from '@equinor/eds-tokens';

const primaryResting = tokens.colors.interactive.primary__resting.hex;

type Colors = [string, string, string, string];
interface McPkgIconProps {
    /**
     * From top-left to bottom-right
     * I.E ["orange", "orange", "orange", "orange"]
     */
    colors?: Colors;
}

export const McPkgIcon = ({
    colors = [primaryResting, primaryResting, primaryResting, primaryResting],
}: McPkgIconProps): JSX.Element => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10.5 13.1346V20.5866L4 18.2925V10.0758L10.5 13.1346Z"
            fill={colors.at(0)}
            stroke={colors.at(0)}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M14 21.2933L21.5 18.6462L21.5 9.28789L14 12.8173L14 21.2933Z"
            fill={colors.at(0)}
            stroke={colors.at(0)}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M10.5 8.92422L5.4782 6.56102L10.5 4.49322V8.92422Z"
            fill={colors.at(0)}
            stroke={colors.at(0)}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M20.7609 6.53051L14 3.74661L14 9.71211L20.7609 6.53051Z"
            fill={colors.at(0)}
            stroke={colors.at(0)}
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="M17.8249 18.596C18.8418 18.596 19.4956 18.212 19.9556 17.62C19.996 17.564 19.9798 17.5 19.9072 17.444L19.3745 17.012C19.2938 16.94 19.2292 16.956 19.1646 17.028C18.8822 17.388 18.4948 17.636 17.8249 17.636C16.7756 17.636 16.0573 16.796 16.0573 15.7C16.0573 14.604 16.7756 13.764 17.8249 13.764C18.3979 13.764 18.8499 14.004 19.2211 14.396C19.2857 14.468 19.3584 14.468 19.4229 14.404L19.9556 13.876C20.0121 13.812 20.0202 13.732 19.9475 13.66C19.4391 13.14 18.8095 12.804 17.8249 12.804C16.1945 12.804 15 13.956 15 15.7C15 17.444 16.1945 18.596 17.8249 18.596Z"
            fill="white"
        />
        <path
            d="M5.364 18.5C5.46 18.5 5.516 18.444 5.516 18.356V15.116L6.844 17.596C6.876 17.668 6.932 17.708 7.012 17.708H7.484C7.564 17.708 7.62 17.676 7.66 17.596L8.988 15.14V18.356C8.988 18.444 9.044 18.5 9.14 18.5H9.852C9.948 18.5 9.996 18.444 9.996 18.356V13.044C9.996 12.956 9.948 12.9 9.852 12.9H9.18C9.1 12.9 9.044 12.932 9.004 13.012L7.252 16.316L5.5 13.012C5.46 12.932 5.404 12.9 5.324 12.9H4.652C4.556 12.9 4.5 12.956 4.5 13.044V18.356C4.5 18.444 4.556 18.5 4.652 18.5H5.364Z"
            fill="white"
        />
    </svg>
);
