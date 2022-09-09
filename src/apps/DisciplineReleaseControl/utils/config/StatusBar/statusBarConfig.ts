import { StatusItem } from '@equinor/lighthouse-status-bar';
import { PipetestStep } from '../../../Types/drcEnums';
import { Pipetest } from '../../../Types/pipetest';
import { getPipetestsWithHTCable } from '../../helpers/tableHelpers';

export function statusBarConfig(data: Pipetest[]): StatusItem[] {
    return [
        {
            title: 'Heat trace installed',
            value: () => {
                return getPipetestsWithHTCable(data)
                    .filter((x) => x.step === PipetestStep.Complete)
                    .length.toString();
            },
        },
        {
            title: 'Heat trace planned',
            value: () => {
                return getPipetestsWithHTCable(data)
                    .filter((x) => x.step !== PipetestStep.Complete)
                    .length.toString();
            },
        },
    ];
}
