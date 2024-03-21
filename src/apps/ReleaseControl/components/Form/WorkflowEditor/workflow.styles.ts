import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const DraggableIconWrapper = styled.div`
  cursor: grab;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25em;
  align-items: center;
`;

export const CompletedCriteria = styled.div`
  margin-left: 30px;
`;

export const Selections = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

export const NumberCircle = styled.div`
  text-align: center;
  border: 2px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 50%;
  width: 25px;
  height: 20px;
  margin-bottom: 7px;
`;

export const HiddenDragIcon = styled.div`
  width: 24px;
  height: 24px;
`;

export const StepSelect = styled.div`
  width: 300px;
`;

export const ResponsibleSelect = styled.div`
  width: 400px;
`;
