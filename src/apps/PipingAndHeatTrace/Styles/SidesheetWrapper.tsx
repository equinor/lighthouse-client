import styled from 'styled-components';

export const SidesheetWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  position: relative;
  max-height: ${() => window.innerHeight - 264 + 'px'};
  overflow: auto;
`;

//Filler div to place scrollbar at the bottom of screen
export const WrapperFillerDiv = styled.div`
  height: 100vh;
`;
