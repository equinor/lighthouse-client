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
          <ActualProgress width={getPercentExpended(estimate)} />
          <ActualProgress
            color={redBar.backgroundColor}
            borderColor={redBar.borderColor}
            width={getPercentExpended(actual - estimate)}
          />
        </DoubleProgress>
      ) : (
        <>{highestExpended !== 0 && <ActualProgress width={getPercentExpended(actual)} />}</>
      )}
      <ProgressNumber>
        {parseFloat(Math.round(actual).toString()).toLocaleString('no')}
      </ProgressNumber>
    </ProgressBarContainer>
  );
};

const ProgressNumber = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
`;

const redBar = {
  backgroundColor: '#FBCCCC',
  borderColor: '#EB0000',
};

const DoubleProgress = styled.div`
  display: flex;
`;
