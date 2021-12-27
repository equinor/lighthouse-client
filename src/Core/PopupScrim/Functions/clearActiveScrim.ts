import { getScrimContext } from '../context/scrimContext';
import { dispatch } from '../State/actions';

export function clearActiveScrim(): void {
    dispatch(getScrimContext(), () => {
        return {
            ScrimContent: undefined,
        };
    });
}
