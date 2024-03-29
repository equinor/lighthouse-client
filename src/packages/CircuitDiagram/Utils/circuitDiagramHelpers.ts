import { tokens } from '@equinor/eds-tokens';
import {
  EleNetwork,
  EleNetworkCable,
  EleNetworkCheckList,
  EleNetworkCircuit,
} from '../src/types/eleNetwork';
import {
  CheckListStatus,
  HTSidesheet,
  Pipetest,
  PipetestCompletionStatusColors,
} from '../src/types/pipetestTypes';

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

export const getCircuitDiagramCompletionStatusColor = (completionStatus: string): string => {
  let color = tokens.colors.ui.background__medium.hex;

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

export function getCircuitTestStatus(testType: string, checkLists: EleNetworkCheckList[]): string {
  if (testType === undefined) return CheckListStatus.Outstanding;

  checkLists = checkLists.filter((x) => x.formularType.startsWith(testType));

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

export function getHTSidesheetObjectForHtCable(
  htCable: string,
  pipetests: Pipetest[]
): HTSidesheet {
  const htSidesheet: HTSidesheet = { value: htCable, items: [] };

  htSidesheet.items = pipetests.filter((x) => x.checkLists.some((y) => y.tagNo === htCable));

  return htSidesheet;
}

export const formatDateString = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (date.toString() === 'Invalid Date') return 'N/A';
  const dateParts = new Intl.DateTimeFormat(undefined).formatToParts(date);
  return `${dateParts[0].value}/${dateParts[2].value}/${dateParts[4].value}`;
};

export const updateDisconnection = (
  switchboardArray: EleNetwork[][],
  updatedCable: EleNetworkCable,
  circuitTagNo: string
): EleNetwork[][] => {
  switchboardArray.map((eleNetworks: EleNetwork[]) => {
    eleNetworks.map((eleNetwork: EleNetwork) => {
      if (eleNetwork.circuitAndStarterTagNo === circuitTagNo) {
        const index = eleNetwork.cables.findIndex((cable) => cable.tagNo === updatedCable.tagNo);
        eleNetwork.cables[index] = updatedCable;
      }
      return eleNetwork;
    });

    return eleNetworks;
  });
  return switchboardArray;
};

export const updateIsolation = (
  switchboardArray: EleNetwork[][],
  updatedCircuit: EleNetwork,
  circuitTagNo: string
): EleNetwork[][] => {
  switchboardArray.map((eleNetworks: EleNetwork[]) => {
    if (eleNetworks.some((eleNetwork) => eleNetwork.circuitAndStarterTagNo === circuitTagNo)) {
      const index = eleNetworks.findIndex(
        (eleNetwork) => eleNetwork.circuitAndStarterTagNo === circuitTagNo
      );
      eleNetworks[index].isolated = updatedCircuit.isolated;
      eleNetworks[index].isolatedBy = updatedCircuit.isolatedBy;
      eleNetworks[index].isolatedComment = updatedCircuit.isolatedComment;
      eleNetworks[index].isolatedDate = updatedCircuit.isolatedDate;
    }
    return eleNetworks;
  });
  return switchboardArray;
};
