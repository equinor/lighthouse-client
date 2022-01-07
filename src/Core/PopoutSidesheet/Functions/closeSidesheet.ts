import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';

export function closeSidesheet(): void {
    dispatch(getSidesheetContext(), () => {
        return {
            SidesheetComponent: undefined,
            props: undefined,
        };
    });
}
