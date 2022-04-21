import styled from 'styled-components';
import { ActualProgress, ProgressBarContainer } from './ProgressBarContainer.styles';

interface ExpendedProgressBarProps {
    actual: number;
    estimate: number;
    highestExpended: number;
}

export const ExpendedProgressBar = ({
    actual,
    estimate,
    highestExpended,
}: ExpendedProgressBarProps): JSX.Element => {
    const getPercentExpended = (number: number) => (number / highestExpended) * 100;

    return (
        <ProgressBarContainer>
            {actual > estimate ? (
                <DoubleProgress>
                    <ActualProgress width={getPercentExpended(estimate)}> {actual} </ActualProgress>
                    <ActualProgress
                        color={redBar.backgroundColor}
                        borderColor={redBar.borderColor}
                        width={getPercentExpended(actual - estimate)}
                    />
                </DoubleProgress>
            ) : (
                <ActualProgress width={getPercentExpended(actual)}> {actual} </ActualProgress>
            )}
        </ProgressBarContainer>
    );
};

const redBar = {
    backgroundColor: '#FBCCCC',
    borderColor: '#EB0000',
};

const DoubleProgress = styled.div`
    display: flex;
`;
