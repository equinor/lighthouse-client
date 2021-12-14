import { getFactoryContext } from '../Context/factoryContext';
import { dispatch } from '../State/actions';
import { DataFactoryState } from '../State/dataFactoryState';

export function clearActiveFactory(): void {
    dispatch(getFactoryContext(), (state: DataFactoryState) => {
        return {
            ...state,
            isActiveFactory: undefined,
            factoryScope: undefined,
        };
    });
}
