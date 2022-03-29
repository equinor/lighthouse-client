import styled from 'styled-components';

interface DefaultWorkflowDotProps {
    height?: number;
    width?: number;
    fill?: string;
    stroke?: string;
}

export function DefaultWorkflowDot({
    fill = 'none',
    stroke = '#6F6F6F',
    height = 20,
    width = 20,
}: DefaultWorkflowDotProps): JSX.Element {
    return (
        <WorkflowDotContainer>
            <svg
                width={width}
                height={height}
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="6" cy="6" r="5.5" stroke={stroke} fill={fill} />
            </svg>
        </WorkflowDotContainer>
    );
}

const WorkflowDotContainer = styled.div`
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
