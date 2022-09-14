import { Atom, deref, swap } from '@dbeining/react-atom';
import { EstimateBar } from '@equinor/Table';

const guesstimateHoursMaxAtom = Atom.of<number>(-1);
interface MhrsRenderProps {
    cell: any;
}
export const GuessMhrsRender = ({ cell }: MhrsRenderProps) => {
    if (deref(guesstimateHoursMaxAtom) === -1) {
        const maxCount = Math.max(
            ...cell.column.filteredRows.map((val) =>
                val.original.disciplineGuesstimates.reduce(
                    (count, curr) => curr.guesstimate + count,
                    0
                )
            )
        );
        swap(guesstimateHoursMaxAtom, () => maxCount);
    }

    const count = deref(guesstimateHoursMaxAtom);

    return <EstimateBar current={cell.value} max={count} />;
};
