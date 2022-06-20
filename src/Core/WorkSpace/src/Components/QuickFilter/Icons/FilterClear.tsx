import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

interface FilterClearIconProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isDisabled?: boolean;
}

export const FilterClearIcon = ({ onClick, isDisabled }: FilterClearIconProps): JSX.Element => (
    <Button variant="ghost_icon" onClick={onClick} disabled={isDisabled}>
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.75994 13C9.75994 13 6.02994 8.2 4.00994 5.61C3.49994 4.95 3.96994 4 4.79994 4H18.7099C19.5399 4 20.0099 4.95 19.4999 5.61C17.4799 8.2 13.7599 13 13.7599 13V19C13.7599 19.55 13.3099 20 12.7599 20H10.7599C10.2099 20 9.75994 19.55 9.75994 19V13ZM18 15.5858L19.2929 14.2929C19.6834 13.9024 20.3166 13.9024 20.7071 14.2929C21.0976 14.6834 21.0976 15.3166 20.7071 15.7071L19.4142 17L20.7071 18.2929C21.0976 18.6834 21.0976 19.3166 20.7071 19.7071C20.3166 20.0976 19.6834 20.0976 19.2929 19.7071L18 18.4142L16.7071 19.7071C16.3166 20.0976 15.6834 20.0976 15.2929 19.7071C14.9024 19.3166 14.9024 18.6834 15.2929 18.2929L16.5858 17L15.2929 15.7071C14.9024 15.3166 14.9024 14.6834 15.2929 14.2929C15.6834 13.9024 16.3166 13.9024 16.7071 14.2929L18 15.5858Z"
                fill={isDisabled ? tokens.colors.interactive.disabled__text.hex : '#007079'}
            />
        </svg>
    </Button>
);
