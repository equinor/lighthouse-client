import { StatusItem } from '@equinor/lighthouse-status-bar';
import { PipetestCheckListOrder, PipetestStep } from '../../../Types/drcEnums';
import { Pipetest } from '../../../Types/pipetest';
import { getPipetestStatusSortValue } from '../../helpers/statusHelpers';
import { getPipetestsWithHTCable } from '../../helpers/tableHelpers';

export function statusBarConfig(data: Pipetest[]): StatusItem[] {
    const pipetestsWithHTCable = getPipetestsWithHTCable(data);
    return [
        {
            title: 'Pipetest total',
            value: () => {
                return data?.length?.toString();
            },
        },
        {
            title: 'Piping open',
            value: () => {
                return data
                    ?.filter(
                        (x) =>
                            getPipetestStatusSortValue(x) <= PipetestCheckListOrder.Bolttensioning
                    )
                    ?.length?.toString();
            },
        },
        {
            title: 'Piping % complete',
            value: () => {
                return (
                    (
                        (100 *
                            data?.filter(
                                (x) =>
                                    getPipetestStatusSortValue(x) >
                                    PipetestCheckListOrder.Bolttensioning
                            )?.length) /
                        data?.length
                    )
                        ?.toFixed(2)
                        ?.toString() + '%'
                );
            },
        },
        {
            title: 'HT total',
            value: () => {
                return pipetestsWithHTCable?.length?.toString();
            },
        },
        {
            title: 'HT open A-test',
            value: () => {
                return pipetestsWithHTCable
                    .filter((x) => getPipetestStatusSortValue(x) <= PipetestCheckListOrder.HtTest)
                    ?.length?.toString();
            },
        },
        {
            title: 'HT open B-test',
            value: () => {
                return pipetestsWithHTCable
                    .filter((x) => getPipetestStatusSortValue(x) <= PipetestCheckListOrder.HtRetest)
                    ?.length?.toString();
            },
        },

        {
            title: 'HT % complete',
            value: () => {
                return (
                    (
                        (100 *
                            pipetestsWithHTCable.filter(
                                (x) =>
                                    x.step === PipetestStep.Marking ||
                                    x.step === PipetestStep.Complete
                            )?.length) /
                        pipetestsWithHTCable?.length
                    )
                        ?.toFixed(2)
                        ?.toString() + '%'
                );
            },
        },
    ];
}
