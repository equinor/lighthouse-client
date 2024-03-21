import { Pipetest } from '../types/pipetestTypes';
import { LineNode } from '../../styles/styles';
import { memo } from 'react';

type LineProps = {
  value?: string;
  currentPipetest: boolean;
  pipetest: Pipetest | undefined;
  htCable?: string;
  onSelect?: (item: Record<PropertyKey, unknown>) => void;
};

const Line = ({ value, currentPipetest, pipetest, htCable, onSelect }: LineProps): JSX.Element => {
  return (
    <LineNode
      currentPipetest={currentPipetest}
      htCable={htCable}
      onClick={() => onSelect && pipetest && onSelect(pipetest)}
    >
      {value}
    </LineNode>
  );
};

export default memo(Line);
