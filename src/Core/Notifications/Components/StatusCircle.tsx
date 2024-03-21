import { StyledStatusCircleWrapper } from './notification.styles';

type StatusCircleProps = {
  seenByUser: boolean;
};
export const StatusCircle = ({ seenByUser }: StatusCircleProps): JSX.Element => {
  return (
    <StyledStatusCircleWrapper>
      <svg
        width={15}
        height={15}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="5.5" fill={seenByUser ? '#E7DEEA' : '#B276B2'} />
      </svg>
    </StyledStatusCircleWrapper>
  );
};
