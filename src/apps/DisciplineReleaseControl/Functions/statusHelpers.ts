import {
    Checklist,
    Pipetest,
    PipetestChecklistOrder,
    PipetestStatus,
    PipetestStatusOrder,
    PipetestTestStatus,
} from '../Types/Pipetest';

export function sortPipetestChecklist(checklists: Checklist[]): Checklist[] {
    checklists.sort((a, b) => getChecklistSortValue(a) - getChecklistSortValue(b));
    return checklists;
}

export function getChecklistSortValue(checklist: Checklist): number {
    let number: number = PipetestChecklistOrder.Unknown;
    if (!checklist.isHeatTrace) {
        switch (checklist.tagNo.substring(0, 2)) {
            case '#B':
                number = PipetestChecklistOrder.Bolttensioning;
                break;
            case '#X':
                number = PipetestChecklistOrder.Painting;
                break;
            case '#Z':
                number = PipetestChecklistOrder.Insulation;
                break;
            case '#M':
                number = PipetestChecklistOrder.Marking;
                break;
        }
    } else {
        if (checklist.formularType === PipetestTestStatus.ATest) {
            number = PipetestChecklistOrder.HtTest;
        } else if (checklist.formularType === PipetestTestStatus.BTest) {
            number = PipetestChecklistOrder.HtRetest;
        }
    }
    return number;
}

export function getPipetestStatus(checkLists: Checklist[]): PipetestStatus {
    let status: PipetestStatus = PipetestStatus.Complete;
    console.log(checkLists);
    for (let i = 0; i < checkLists.length; i++) {
        const checklist = checkLists[i];
        if (!checklist.isHeatTrace) {
            switch (checklist.tagNo.substring(0, 2)) {
                case '#B':
                    if (!isChecklistOk(checklist)) {
                        status = PipetestStatus.ReadyForBolttensioning;
                        return status;
                    }
                    break;
                // case '#T-':
                //     if (!isChecklistOk(checklist)) {
                //         status = PipetestStatus.ReadyForPiping;
                //         return status;
                //     }
                //     break;
                case '#X':
                    if (!isChecklistOk(checklist)) {
                        status = PipetestStatus.ReadyForPainting;
                        return status;
                    }
                    break;
                case '#Z':
                    if (!isChecklistOk(checklist)) {
                        status = PipetestStatus.ReadyForInsulation;
                        return status;
                    }
                    break;
                case '#M':
                    if (!isChecklistOk(checklist)) {
                        status = PipetestStatus.ReadyForMarking;
                        return status;
                    }
            }
        } else {
            if (checklist.formularType === PipetestTestStatus.ATest) {
                if (!isChecklistOk(checklist)) {
                    status = PipetestStatus.ReadyForHtTest;
                    return status;
                }
            } else if (checklist.formularType === PipetestTestStatus.BTest) {
                if (!isChecklistOk(checklist)) {
                    status = PipetestStatus.ReadyForHtRetest;
                    return status;
                }
            }
        }
        //if no other status matches but the checklist is stilln not completed/ok - we set the status to unknown
        if (
            !isChecklistOk(checklist) &&
            checklist.tagNo.substring(0, 2) !== '#C' &&
            checklist.tagNo.substring(0, 2) !== '#H' &&
            checklist.tagNo.substring(0, 2) !== '#T'
        ) {
            status = PipetestStatus.Unknown;
            return status;
        }
    }
    return status;
}

export function isChecklistOk(checklist: Checklist): boolean {
    return checklist.status === 'OK' || checklist.status === 'PB' ? true : false;
}

export function sortPipetests(pipetests: Pipetest[]): Pipetest[] {
    pipetests.sort((a, b) => getPipetestStatusSortValue(a) - getPipetestStatusSortValue(b));
    return pipetests;
}

export function getPipetestStatusSortValue(pipetest: Pipetest): number {
    let number: number = PipetestStatusOrder.Unknown;
    switch (pipetest.status) {
        case PipetestStatus.Unknown:
            number = 0;
            break;
        case PipetestStatus.ReadyForBolttensioning:
            number = PipetestStatusOrder.ReadyForBolttensioning;
            break;
        case PipetestStatus.ReadyForPainting:
            number = PipetestStatusOrder.ReadyForPainting;
            break;
        case PipetestStatus.ReadyForHtTest:
            number = PipetestStatusOrder.ReadyForHtTest;
            break;
        case PipetestStatus.ReadyForInsulation:
            number = PipetestStatusOrder.ReadyForInsulation;
            break;
        case PipetestStatus.ReadyForHtRetest:
            number = PipetestStatusOrder.ReadyForHtRetest;
            break;
        case PipetestStatus.ReadyForMarking:
            number = PipetestStatusOrder.ReadyForMarking;
            break;
        case PipetestStatus.Complete:
            number = PipetestStatusOrder.Complete;
            break;
    }

    return number;
}


