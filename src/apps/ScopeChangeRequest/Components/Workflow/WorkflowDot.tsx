import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Active' | 'Completed' | 'Inactive';
}

interface dotStyling {
    color: string;
    stroke: string;
}

export const WorkflowDot = ({ state, height = 15, width = 15 }: WorkflowDotProps): JSX.Element => {
    const color: dotStyling = useMemo(() => {
        switch (state) {
            case 'Active':
                return {
                    color: tokens.colors.infographic.substitute__blue_overcast.hex,
                    stroke: '',
                };

            case 'Completed':
                return {
                    color: tokens.colors.infographic.substitute__green_succulent.hex,
                    stroke: '',
                };

            case 'Inactive':
                return {
                    color: '',
                    stroke: '#6F6F6F',
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
            <circle cx="6" cy="6" r="5.5" stroke={color.stroke} fill={color.color} />
        </svg>
    );
};
