import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface WorklflowLineProps {
    colored: boolean;
}

export const WorkflowLine = ({ colored }: WorklflowLineProps): JSX.Element => {
    if (colored) {
        return (
            <div>
                <VerticalLine
                    style={{
                        borderColor: tokens.colors.interactive.primary__resting.rgba,
                        backgroundColor: tokens.colors.interactive.primary__resting.rgba,
                    }}
                />
            </div>
        );
    }

    return <VerticalLine />;
};

const VerticalLine = styled.div`
    width: 24px;
    border: 1px solid;
    transform: rotate(90deg);
`;
