import styled from 'styled-components';

export const TableData = styled.td`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  padding-left: 5px;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  border-bottom: 2px #dcdcdc solid;
`;

export const Table = styled.table`
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: #f7f7f7;
  border-bottom: 2px solid #dcdcdc;
`;

export const Header = styled.tr`
  background: #f7f7f7;
`;

export const ColumnHeader = styled.th`
  background: #f7f7f7;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  height: 30px;
  width: 121px;
  padding-left: 5px;
`;
