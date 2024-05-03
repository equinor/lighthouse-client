import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const Content = styled.section`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto;
  background-color: ${tokens.colors.ui.background__light.rgba};
`;

export const Header = styled.div`
  height: fit-content;
  margin: 0.5rem;
`;

export const ViewportWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem;
  height: 100%;
`;

export const Container = styled.div`
  padding-top: 1rem;
  display: flex;
  width: 80%;
`;

export const MainColumn = styled.div`
  width: 100%;
  margin: 8px 1.5rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

export const SideColumn = styled.div`
  width: 550px;
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

export const KpiBar = styled.div`
  margin: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const KpiItem = styled.div`
  flex: 1;
  margin-left: 1rem;
  background-color: green;

  :first-child {
    margin-left: 0;
  }
`;

export const Main = styled.div`
  margin: 0.5rem;
  height: 500px;
  width: 100%;
  background-color: ${tokens.colors.ui.background__default.rgba};
`;

interface SideItemProps {
  height?: number;
}

export const SideItem = styled.div`
  margin: 1rem;
  height: ${({ height }: SideItemProps) => `${height || 325}px`};
  width: 100%;
  background-color: ${tokens.colors.ui.background__default.rgba};
`;
