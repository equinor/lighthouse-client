interface DefaultWorkflowDotProps {
    height?: number;
    width?: number;
    fill?: string;
    stroke?: string;
}

export function DefaultWorkflowDot({
    fill = 'none',
    stroke = '#6F6F6F',
    height = 12,
    width = 12,
}: DefaultWorkflowDotProps): JSX.Element {
    return (
        <svg width={width} height={height} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="5" stroke={stroke} fill={fill} />
        </svg>
    );
}
