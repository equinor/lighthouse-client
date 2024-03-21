import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export type ReleaseControlItemProps = {
  isExpanded: boolean;
  isSelected: boolean;
};

export const Root = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

export const ReleaseControlItem = styled.div<ReleaseControlItemProps>`
  display: grid;
  grid-template-columns: 3fr auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: ${tokens.colors.infographic.primary__mist_blue.hex};
  color: ${tokens.colors.text.static_icons__default.rgba};
  cursor: pointer;
  border: 1px solid #ededed;
  height: 100%;
  width: 170px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 2px;
  padding: 0.18rem 0.5rem;
  outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;

export const MidSection = styled.div<{ expanded: boolean }>`
  grid-column: 1/3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`;

export const Title = styled.div``;
