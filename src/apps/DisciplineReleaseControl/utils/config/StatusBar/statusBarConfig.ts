import { StatusItem } from '@equinor/lighthouse-status-bar';
import { PipetestCheckListOrder, PipetestStep } from '../../../Types/drcEnums';
import { Pipetest } from '../../../Types/pipetest';
import { getPipetestStatusSortValue } from '../../helpers/statusHelpers';
import { getPipetestsWithHTCable } from '../../helpers/tableHelpers';

function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

export function statusBarConfig(data: Pipetest[]): StatusItem[] {
    const pipetestsWithHTCable = getPipetestsWithHTCable(data);
    return [
        {
            title: 'Pipetest total',
            value: () => {
                return numberFormat(data?.length);
            },
        },
        {
            title: 'Piping open',
            value: () => {
                return numberFormat(
                    data?.filter(
                        (x) =>
                            getPipetestStatusSortValue(x) <= PipetestCheckListOrder.Bolttensioning
                    )?.length
                );
            },
        },
        {
            title: 'Piping % complete',
            value: () => {
                return (
                    Number(
                        (
                            (100 *
                                data?.filter(
                                    (x) =>
                                        getPipetestStatusSortValue(x) >
                                        PipetestCheckListOrder.Bolttensioning
                                )?.length) /
                            data?.length
                        ).toFixed(2)
                    ) + '%'
                );
            },
        },
        {
            title: 'HT total',
            value: () => {
                return numberFormat(pipetestsWithHTCable?.length);
            },
        },
        {
            title: 'HT open A-test',
            value: () => {
                return numberFormat(
                    pipetestsWithHTCable.filter(
                        (x) => getPipetestStatusSortValue(x) <= PipetestCheckListOrder.HtTest
                    )?.length
                );
            },
        },
        {
            title: 'HT open B-test',
            value: () => {
                return numberFormat(
                    pipetestsWithHTCable.filter(
                        (x) => getPipetestStatusSortValue(x) <= PipetestCheckListOrder.HtRetest
                    )?.length
                );
            },
        },

        {
            title: 'HT % complete',
            value: () => {
                return (
                    Number(
                        (
                            (100 *
                                pipetestsWithHTCable.filter(
                                    (x) =>
                                        x.step === PipetestStep.Marking ||
                                        x.step === PipetestStep.Complete
                                )?.length) /
                            pipetestsWithHTCable?.length
                        ).toFixed(2)
                    ) + '%'
                );
            },
        },
    ];
}
