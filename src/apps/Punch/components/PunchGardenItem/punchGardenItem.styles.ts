import styled from 'styled-components';

type PunchItemProps = { backgroundColor: string; textColor: string; isSelected: boolean };

export const StyledPunchItem = styled.div<PunchItemProps>`
  display: grid;
  grid-template-columns: 15px 3fr auto;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  cursor: pointer;
  height: 100%;
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 2px;
  outline: ${(props) => (props.isSelected ? '2px dashed green' : '')};
  outline-offset: ${(props) => (props.isSelected ? '2px' : '')};
`;

export const StyledRoot = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 5px;
  position: relative;
`;

export const StyledItemText = styled.div`
  grid-column: 2/3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type StatusCirclesProps = {
  typeColor: string;
};
export const StyledStatusCircles = styled.div<StatusCirclesProps>`
  display: flex;
  grid-column: 3/4;
  justify-content: end;
  align-items: center;

  ::before {
    width: 12px;
    height: 12px;
    border: 1px solid white;
    background-color: ${(props) => props.typeColor};
    border-radius: 50%;
    margin: 0px 1px;
    content: ' ';
  }
`;
