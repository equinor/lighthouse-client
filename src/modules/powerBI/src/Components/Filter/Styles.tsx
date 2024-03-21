import { Button } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

type FilterWrapperProps = {
  isFilterActive: boolean;
};
export const FilterWrapper = styled.div<FilterWrapperProps>`
  display: ${(props) => (props.isFilterActive ? 'flex' : 'none')};
  background: ${tokens.colors.ui.background__light.rgba};
  border-bottom: 1.5px solid ${tokens.colors.ui.background__medium.rgba};
  height: 200px;
  overflow-x: auto;
`;

export const FilterGroupWrap = styled.div`
  border-right: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;

export const FilterItemsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 12px;
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
`;

export const Item = styled(Button)`
  width: 36px;
  height: 36px;
`;

export const ExpandedFilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  height: 250px;
  overflow: hidden;
  border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
`;

export const Sidebar = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.24);
`;
