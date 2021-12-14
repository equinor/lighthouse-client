import { useMemo } from 'react';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Active' | 'Completed' | 'Inactive';
}

export const WorkflowDot = ({ state, height = 12, width = 12 }: WorkflowDotProps): JSX.Element => {
    const color = useMemo(() => {
        switch (state) {
            case 'Active':
                return '#00977B';

            case 'Completed':
                return '#00977B';

            case 'Inactive':
                return '#00977B';
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
            <circle cx="6" cy="6" r="6" fill={color} />
        </svg>
    );
};
