import { Atom, deref, swap } from '@dbeining/react-atom';
import { EstimateBar } from '@equinor/Table';

const woRemaningHoursMaxAtom = Atom.of<number>(-1);
interface GuessMhrsRenderProps {
  cell: any;
}
export const WORemMhrsRender = ({ cell }: GuessMhrsRenderProps) => {
  if (deref(woRemaningHoursMaxAtom) === -1) {
    const maxCount = Math.max(
      ...cell.column.filteredRows.map((val) =>
        Number(val.original?.workOrdersTotalRemainingManHours)
      )
    );
    swap(woRemaningHoursMaxAtom, () => maxCount);
  }
  const highestRemaning = deref(woRemaningHoursMaxAtom);
  return <EstimateBar current={Number(cell.value)} max={highestRemaning} />;
};
