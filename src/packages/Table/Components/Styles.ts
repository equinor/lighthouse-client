import styled, { css } from 'styled-components';

export const Table = styled.div`
  display: inline-block;
  border-spacing: 0;
`;

export const TableRow = styled.div<{ selected?: boolean }>`
  color: inherit;
  outline: 0;
  vertical-align: middle;
  display: flex;
  /* flex: 0 0 auto; */
  justify-content: flex-start;
  width: 100%;
  border-bottom: 1px solid rgba(224, 224, 224, 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
  :last-child {
    border-bottom: none;
  }
  ${(props): any =>
    props.selected &&
    css`
      background-color: rgb(230, 250, 236);
      &:hover {
        background-color: rgba(0, 0, 0, 0.07);
      }
    `}
`;

export const HeaderActions = styled.div`
  display: flex;
`;

export const HeaderItem = styled.div`
  padding-right: 0.5rem;

  opacity: 1;
  height: 60%;

  :hover {
    opacity: 0.5;
  }
`;

export const TableHeadCell = styled.div<{ align?: string }>`
  padding: 0px 0px 0px 10px;
  flex-direction: row;

  &:hover {
    ${HeaderItem} {
      visibility: visible;
    }
  }

  ${HeaderItem} {
    visibility: hidden;
  }

  font-size: 13px;
  height: 32px;
  font-weight: 500;
  background-color: rgb(247, 247, 247);
  line-height: 1.5rem;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${(props): string => (props.align === 'right' ? 'right' : 'left')};
  :last-child {
    border-right: none;
  }
`;

export const TableCell = styled.div<{ align?: string }>`
  padding-left: 5px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
// color: inherit;
// justify-content: ${(props): string =>
//     props.align === 'right' ? 'flex-end' : 'flex-start'};
// align-items: center;
// display: flex;
// height: 35px;
// flex-direction: row;
// text-align: ${(props): string =>
//     props.align === 'right' ? 'right' : 'left'};
// :last-child {
//     border-right: none;
// }

export const ResizeHandleComponent = styled.div<{ handleActive: boolean }>`
  position: absolute;
  cursor: col-resize;

  opacity: 1;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  /* border-right: 1px solid rgba(0, 0, 0, 0.5); */
  height: 60%;
  top: 20%;
  transition: all linear 100ms;
  right: -2px;
  width: 3px;
  ${(props): any =>
    props.handleActive &&
    css`
      opacity: 1;
      border: none;
      background-color: rgba(0, 0, 0, 0.5);
      height: calc(100% - 4px);
      top: 2px;
      right: -1px;
      width: 1px;
    `}
`;

export const HeaderCellMenuButton = styled.div`
  /* position: absolute; */
  cursor: pointer;

  opacity: 1;
  height: 60%;
  /* top: 20%;
    right: 6px; */
  :hover {
    opacity: 0.8;
  }
`;
