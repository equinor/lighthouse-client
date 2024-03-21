import { Atom, deref, swap } from '@dbeining/react-atom';
import { EstimateBar } from '@equinor/Table';

const woEstimateHoursMaxAtom = Atom.of<number>(-1);
interface MhrsRenderProps {
  cell: any;
}

export const WOEstMhrsRender = ({ cell }: MhrsRenderProps) => {
  if (deref(woEstimateHoursMaxAtom) === -1) {
    const maxCount = Math.max(
      ...cell.column.filteredRows.map((val) => val.original.workOrdersTotalEstimatedManHours)
    );
    swap(woEstimateHoursMaxAtom, () => maxCount);
  }

  const highestEstimateHours = deref(woEstimateHoursMaxAtom);

  return <EstimateBar current={cell.value} max={highestEstimateHours} />;
};
