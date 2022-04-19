import { PipetestCompletionStatusColors } from '../../Styles/ReleaseControlColors';
import { CheckListStatus } from '../../Types/drcEnums';
import {
    EleNetwork,
    EleNetworkCable,
    EleNetworkCheckList,
    EleNetworkCircuit,
} from '../../Types/eleNetwork';

export function getCircuitChildren(
    eleNetwork: EleNetwork,
    parent?: EleNetworkCircuit
): EleNetworkCircuit[] {
    if (parent === undefined) return [];
    return eleNetwork.circuits.filter((child) => child.parentEleNetId === parent.eleNetId);
}

export function getCableChildren(
    eleNetwork: EleNetwork,
    parent?: EleNetworkCircuit
): EleNetworkCable[] {
    if (parent === undefined) return [];
    const circuits = getCircuitChildren(eleNetwork, parent);
    return eleNetwork.cables.filter((child) =>
        circuits.some((x) => x.tagNo === child.tagTo && child.tagNo.substring(0, 2) !== 'HT')
    );
}

export function getNodeStatus(checkLists: EleNetworkCheckList[], tagNo?: string): string {
    if (tagNo === undefined) return CheckListStatus.Outstanding;

    checkLists = checkLists.filter((x) => x.tagNo === tagNo);

    if (checkLists?.length === 0) {
        return CheckListStatus.Inactive;
    } else if (checkLists.every((x) => x.status === CheckListStatus.OK)) {
        return CheckListStatus.OK;
    } else if (checkLists.find((x) => x.status === CheckListStatus.Outstanding)) {
        {
            return CheckListStatus.Outstanding;
        }
    } else if (checkLists.find((x) => x.status === CheckListStatus.PunchAError)) {
        return CheckListStatus.PunchAError;
    } else if (checkLists.find((x) => x.status === CheckListStatus.PunchBError)) {
        return CheckListStatus.PunchBError;
    } else {
        return CheckListStatus.Outstanding;
    }
}

export const getElectroViewCompletionStatusColor = (completionStatus: string): string => {
    let color = '#DCDCDC';

    switch (completionStatus) {
        case CheckListStatus.Outstanding:
            color = PipetestCompletionStatusColors.OS;
            break;
        case CheckListStatus.OK:
            color = PipetestCompletionStatusColors.OK;
            break;
        case CheckListStatus.PunchBError:
            color = PipetestCompletionStatusColors.PB;
            break;
        case CheckListStatus.PunchAError:
            color = PipetestCompletionStatusColors.PA;
            break;
    }
    return color;
};

export function getElectroTestStatus(testType: string, checkLists: EleNetworkCheckList[]): string {
    if (testType === undefined) return CheckListStatus.Outstanding;

    checkLists = checkLists.filter((x) => x.formularType === testType);

    if (checkLists?.length === 0) {
        return CheckListStatus.Inactive;
    } else if (checkLists.every((x) => x.status === CheckListStatus.OK)) {
        return CheckListStatus.OK;
    } else if (checkLists.find((x) => x.status === CheckListStatus.Outstanding)) {
        {
            return CheckListStatus.Outstanding;
        }
    } else if (checkLists.find((x) => x.status === CheckListStatus.PunchAError)) {
        return CheckListStatus.PunchAError;
    } else if (checkLists.find((x) => x.status === CheckListStatus.PunchBError)) {
        return CheckListStatus.PunchBError;
    } else {
        return CheckListStatus.Outstanding;
    }
}
