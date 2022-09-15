import { Atom, deref, swap } from '@dbeining/react-atom';
import { ExpendedProgressBar } from '@equinor/Table';

const woExpHoursMaxAtom = Atom.of<number>(-1);
interface MhrsRenderProps {
    cell: any;
}
export const WOExpMhrsRender = ({ cell }: MhrsRenderProps) => {
    if (deref(woExpHoursMaxAtom) === -1) {
        const maxCount = Math.max(
            ...cell.column.filteredRows.map((val) => val.original.workOrdersTotalExpendedManHours)
        );
        swap(woExpHoursMaxAtom, () => maxCount);
    }

    const highestExpendedHours = deref(woExpHoursMaxAtom);

    if (cell.isGrouped) {
        return cell.value;
    }

    return (
        <ExpendedProgressBar
            actual={cell.value}
            estimate={cell.row.original.workOrdersTotalExpendedManHours}
            highestExpended={highestExpendedHours}
        />
    );
};
