interface DocumentIconProps {
    width?: number;
    height?: number;
}

export const DocumentIcon = ({ width = 50, height = 35 }: DocumentIconProps): JSX.Element => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 0H2.5C1.4 0 0.5 0.9 0.5 2V16H2.5V2H14.5V0ZM13.5 4H6.5C5.4 4 4.51 4.9 4.51 6L4.5 20C4.5 21.1 5.39 22 6.49 22H17.5C18.6 22 19.5 21.1 19.5 20V10L13.5 4ZM6.5 6V20H17.5V11H12.5V6H6.5Z"
                fill="#007079"
            />
        </svg>
    );
};
