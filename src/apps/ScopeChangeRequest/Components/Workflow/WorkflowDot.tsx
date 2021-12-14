import { useMemo } from 'react';

interface WorkflowDotProps {
    height?: number;
    width?: number;
    state: 'Active' | 'Completed' | 'Inactive';
}

export const WorkflowDot = ({ state, height = 15, width = 15 }: WorkflowDotProps): JSX.Element => {
    const color = useMemo(() => {
        switch (state) {
            case 'Active':
                return '#78C0FF';

            case 'Completed':
                return '#00977B';

            case 'Inactive':
                return '##FFFFFF';
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
            <circle cx="6" cy="6" r="5.5" stroke="#6F6F6F" fill={color} />
        </svg>
    );
};
