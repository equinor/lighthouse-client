import { SingleSelect } from '@equinor/eds-core-react';
import { useParkViewContext } from '@equinor/ParkView';
import { CustomGroupByKeys } from '../types';

export function LoopGroupBySelect(): JSX.Element {
    const { setCustomGroupKeys, ...parkViewContext } = useParkViewContext();
    const customGroupByKeys = parkViewContext.customGroupByKeys as CustomGroupByKeys;

    return (
        <>
            <SingleSelect
                key={'plannedForecast'}
                items={['Planned', 'Forecast']}
                label={''}
                selectedOption={customGroupByKeys.plannedForecast}
                handleSelectedItemChange={(changes) =>
                    setCustomGroupKeys({
                        ...customGroupByKeys,
                        plannedForecast: changes.selectedItem || 'Planned',
                    })
                }
            />

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
