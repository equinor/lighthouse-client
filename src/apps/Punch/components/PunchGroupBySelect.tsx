import { SingleSelect } from '@equinor/eds-core-react-old';
import { useParkViewContext } from '@equinor/ParkView';
import { CustomGroupByKeys } from '../types';

export function PunchGroupBySelect(): JSX.Element {
    const { setCustomGroupKeys, ...parkViewContext } = useParkViewContext();
    const customGroupByKeys = parkViewContext.customGroupByKeys as CustomGroupByKeys;

    return (
        <>
            <SingleSelect
                key={'weeklyDaily'}
                items={['Weekly', 'Daily']}
                label={''}
                selectedOption={customGroupByKeys.weeklyDaily}
                handleSelectedItemChange={(changes) =>
                    setCustomGroupKeys({
                        ...customGroupByKeys,
                        weeklyDaily: changes.selectedItem || 'Weekly',
                    })
                }
            />
        </>
    );
}
