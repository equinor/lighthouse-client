import { tokens } from '@equinor/eds-tokens';
import { TestDotCircle, TestDotCircleText, TestDotWrapper } from '../../styles/styles';
import { getCircuitDiagramCompletionStatusColor } from '../../Utils/circuitDiagramHelpers';
import { PipetestCompletionStatusColors } from '../types/pipetestTypes';

interface TestDotProps {
    value?: string;
    status: string;
    hasLightningIcon: boolean;
}
export const TestDot = ({ value, status, hasLightningIcon }: TestDotProps): JSX.Element => {
    const color = getCircuitDiagramCompletionStatusColor(status);
    const LightningIcon = (
        <svg
            width="8"
            height="14"
            viewBox="0 0 8 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: '1px' }}
        >
            <path
                d="M0 0V11H3.06977V20L8 8H3.90698L6.97674 0H0Z"
                fill={
                    color === PipetestCompletionStatusColors.OK ||
                    color === PipetestCompletionStatusColors.PA
                        ? tokens.colors.text.static_icons__primary_white.hex
                        : tokens.colors.text.static_icons__default.hex
                }
            />
        </svg>
    );
    return (
        <TestDotWrapper>
            <TestDotCircle color={color}>
                {hasLightningIcon && LightningIcon}
                <TestDotCircleText>{value}</TestDotCircleText>
            </TestDotCircle>
        </TestDotWrapper>
    );
};
