import { CriticalLineVisualStyle, TestDotCircleText, TestDotWrapper } from '../../styles/styles';

export const CriticalLineVisual = (): JSX.Element => {
    return (
        <TestDotWrapper>
            <CriticalLineVisualStyle>
                <TestDotCircleText>CL</TestDotCircleText>
            </CriticalLineVisualStyle>
        </TestDotWrapper>
    );
};
