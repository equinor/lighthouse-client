import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Outstanding' | 'Completed' | 'Inactive' | 'Error';
    text?: string;
    active: boolean;
}

interface dotStyling {
    color: string;
    stroke: string;
}

export const WorkflowDot = ({
    state,
    height = 15,
    width = 15,
    text,
    active,
}: WorkflowDotProps): JSX.Element => {
    const color: dotStyling = useMemo(() => {
        switch (state) {
            case 'Outstanding':
                return {
                    color: '',
                    stroke: '#6F6F6F',
                    text: text,
                };

            case 'Completed':
                return {
                    color: tokens.colors.infographic.substitute__green_succulent.hex,
                    stroke: '',
                    text: text,
                };
            case 'Inactive':
                return {
                    color: '#D3D3D3',
                    stroke: '#6F6F6F',
                    text: text,
                };
            case 'Error':
                return {
                    color: '#FF0000',
                    stroke: '#FF0000',
                    text: text,
                };
        }
    }, [state]);

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {!active ? (
                <circle
                    cx="6"
                    cy="6"
                    r="5.5"
                    stroke={color.stroke}
                    fill={color.color}
                    strokeDasharray="2,2"
                />
            ) : (
                <circle cx="6" cy="6" r="5.5" stroke={color.stroke} fill={color.color} />
            )}
            <text x="3.5" y="8" fill="#000" fontSize="0.55em">
                {text}
            </text>
        </svg>
    );
};
