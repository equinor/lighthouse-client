import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { PipetestCompletionStatusColors } from '../../../Styles/ReleaseControlColors';
import { getElectroViewCompletionStatusColor } from '../electroViewHelpers';

interface TestDotProps {
    value?: string;
    status: string;
}
export const TestDot = ({ value, status }: TestDotProps): JSX.Element => {
    const color = getElectroViewCompletionStatusColor(status);
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
                {LightningIcon}
                <TestDotCircleText>{value}</TestDotCircleText>
            </TestDotCircle>
        </TestDotWrapper>
    );
};

const TestDotWrapper = styled.div`
    display: flex;
    flex-direction: horizontal;
    flex: 1;
    justify-content: center;
`;

const TestDotCircle = styled.div<{ color: string }>`
    display: flex;
    flex-direction: horizontal;
    justify-content: center;
    text-align: center;
    width: 30px;
    height: 16px;
    margin-right: 2px;
    border-radius: 100px;
    background-color: ${(p) => p.color};
    color: ${(p) =>
        p.color === PipetestCompletionStatusColors.OK ||
        p.color === PipetestCompletionStatusColors.PA
            ? tokens.colors.text.static_icons__primary_white.hex
            : tokens.colors.text.static_icons__default.hex};
`;

export const TestDotCircleText = styled.div`
    font-size: 16px;
    font-weight: 400, regular;
    cursor: default;
`;
