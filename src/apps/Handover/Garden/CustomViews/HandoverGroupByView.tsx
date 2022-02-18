import { SingleSelect } from '@equinor/eds-core-react';
import { useParkViewContext } from '../../../../components/ParkView/Context/ParkViewProvider';
import { HandoverCustomGroupByKeys } from '../models/handoverCustomGroupByKeys';

export function HandoverGroupByView(): JSX.Element {
    const { setCustomGroupKeys, ...parkViewContext } = useParkViewContext();
    const customGroupByKeys = parkViewContext.customGroupByKeys as HandoverCustomGroupByKeys;

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
