import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export type ReleaseControlItemProps = {
  backgroundColor: string;
  textColor: string;
  isGrouped: boolean;
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
  background: ${(props) => props.backgroundColor};
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
  grid-column: 1/2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`;

export const Icons = styled.div`
  display: flex;
  grid-column: 2/3;
  justify-content: end;
  align-items: center;
`;

export const Title = styled.div``;

export const SubGroupWrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  margin-bottom: 4px;
  border: 1px solid ${tokens.colors.ui.background__medium.hex};
  border-radius: 5px;
  color: ${tokens.colors.text.static_icons__default.rgba};
  width: 98%;
  height: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SubGroupText = styled.div`
  display: flex;
  margin-left: 4px;
  font-variant-numeric: tabular-nums;
`;

export const HTSubGroupText = styled.div`
  display: flex;
  margin-left: 4px;
  margin-top: 4.5px;
  font-variant-numeric: tabular-nums;
  width: 80px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
    text-decoration: underline;
  }
`;

export const HTGardenSubGroup = styled.div`
  display: flex;
`;

export const Chevron = styled.div`
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;
