import { Column, Table } from '@equinor/Table';
import { Wrapper, WrapperFillerDiv } from '../../Styles/SidesheetWrapper';
import { CheckListType } from '../../Types/pipetest';
import { sortCheckListTable } from '../../utils/helpers/tableHelpers';
import { CheckListStatusCell } from './CheckListStatusCell';

type TableProps = {
  checkLists: CheckListType[];
};

export const CheckListTable = ({ checkLists }: TableProps): JSX.Element => {
  if (!checkLists?.length) return <h2>No checklists found</h2>;

  const rowHeight = 35;

  checkLists = sortCheckListTable(checkLists);

  const columns: Column<CheckListType>[] = [
    {
      id: 'tagNo',
      Header: 'Tag',
      accessor: (item) => item.tagNo,
      width: 150,
    },
    {
      id: 'revision',
      Header: 'Revision',
      accessor: (item) => item.revision,
      width: 75,
    },
    {
      id: 'formularType',
      Header: 'Formular type',
      accessor: (item) => item.formularType,
      width: 100,
    },
    {
      id: 'responsible',
      Header: 'Responsible',
      accessor: (item) => item.responsible,
      width: 100,
    },
    {
      id: 'status',
      Header: 'Status',
      accessor: (item) => item,
      Cell: CheckListStatusCell,
      width: 75,
    },
  ];

  return (
    <Wrapper>
      <h4>Pipetest checklists:</h4>
      <div>
        <Table
          data={checkLists}
          columns={columns}
          options={{}}
          height={rowHeight + checkLists?.length * rowHeight}
        />
      </div>
      <WrapperFillerDiv />
    </Wrapper>
  );
};
