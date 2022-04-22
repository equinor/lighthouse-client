import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface WorklflowLineProps {
    colored: boolean;
    height: string;
}

export const WorkflowLine = ({ colored, height }: WorklflowLineProps): JSX.Element => {
    if (colored) {
        return (
            <div>
                <VerticalLine
                    style={{
                        borderColor: tokens.colors.interactive.primary__resting.rgba,
                        backgroundColor: tokens.colors.interactive.primary__resting.rgba,
                        width: height,
                    }}
                />
            </div>
        );
    }

    return <VerticalLine />;
};

const VerticalLine = styled.div`
    border: 1px solid grey;
    transform: rotate(90deg);
    background-color: grey;
`;
