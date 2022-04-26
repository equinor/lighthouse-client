interface DotProps {
    text: number | string;
    fillColor?: string;
    stroke?: string;
}

export const DotWithText = ({
    text,
    fillColor = '#F7E5CE',
    stroke = '#F7E5CE',
}: DotProps): JSX.Element => (
    <svg width={24} height={24} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="5.5" stroke={stroke} fill={fillColor} />

        <text x="3.5" y="8" fill="#000" fontSize="0.55em">
            {text}
        </text>
    </svg>
);
