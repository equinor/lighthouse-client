import { FilterOptions, FilterValueType } from '@equinor/filter';
import { ReleaseControl } from '../../types/releaseControl';

const getNextToSign = (rc: ReleaseControl) => {
  const nextToSign = rc.workflowSteps.find((step) => {
    if (step.criterias[0]?.signedAtUtc === null) {
      return true;
    }
  });
  return nextToSign?.criterias[0].valueDescription ?? null;
};

export const filterOptions: FilterOptions<ReleaseControl> = [
  {
    name: 'Current step',
    valueFormatter: (s) => (s.currentWorkflowStep ? s.currentWorkflowStep.name : null),
  },
  {
    name: 'Contains Step',
    valueFormatter: ({ workflowSteps }) => {
      return workflowSteps
        .filter((x) => !x.isCompleted)
        .map((x) => x.name)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  {
    name: 'Next to Sign',
    valueFormatter: (s) => getNextToSign(s),
  },
  {
    name: 'Contains Person',
    valueFormatter: ({ workflowSteps }) => {
      return workflowSteps
        .filter((x) => !x.isCompleted)
        .map((x) => x.criterias.map((y) => y.valueDescription))
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  {
    name: "Created by",
    valueFormatter: ({ createdBy }) => {
      if (!createdBy) return null;
      return `${createdBy.firstName} ${createdBy.lastName}`
    }
  },
  {
    name: 'Tags',
    valueFormatter: ({ scopeTags }) => {
      if (!scopeTags) {
        return null;
      }
      return scopeTags?.map((x) => x.tagNo).filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  {
    name: 'HT Tags',
    valueFormatter: ({ scopeHTTags }) => {
      if (!scopeHTTags) {
        return null;
      }
      return scopeHTTags?.map((x) => x.tagNo).filter((v, i, a) => a.indexOf(v) === i);
    },
  },
  {
    name: 'System',
    valueFormatter: ({ commPkNos }) =>
      commPkNos
        ?.map((system) => system.slice(0, 2))
        .filter((v, i, a) => a.indexOf(v) === i),
  },
  // {
  //     name: 'Circuit',
  //     valueFormatter: ({ circuits }) =>
  //         circuits
  //             ?.map((circuit) => (circuit !== '' ? circuit : null))
  //             .filter((v, i, a) => a.indexOf(v) === i),
  // },
  // {
  //     name: 'Switchboard',
  //     valueFormatter: ({ switchboards }) =>
  //         switchboards
  //             ?.map((switchboard) => (switchboard !== '' ? switchboard : null))
  //             .filter((v, i, a) => a.indexOf(v) === i),
  // },
  {
    name: 'State',
    valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
    defaultUncheckedValues: ['Voided', 'Closed'],
  },
  {
    name: 'CommPk',
    valueFormatter: ({ commPkNos }) =>
      commPkNos
        ?.map((commPk) => (commPk !== '' ? commPk : null))
        .filter((v, i, a) => a.indexOf(v) === i),
  },
  // {
  //     name: 'Area',
  //     valueFormatter: ({ areas }) =>
  //         areas
  //             ?.map((area) => (area !== '' ? area : null))
  //             .filter((v, i, a) => a.indexOf(v) === i),
  // },
  {
    name: 'Time on step',
    valueFormatter: ({ timeOnLastStep }) => weekConverter(Number(timeOnLastStep)),
  },
  { name: 'Phase', valueFormatter: ({ phase }) => phase },
  {
    name: 'Disconnected',
    valueFormatter: ({ hasDisconnectedEquipment }) =>
      booleanToHumanReadable(hasDisconnectedEquipment),
    sort: (s) => s.sort(sortOnYesNo),
  },
  {
    name: 'Isolated',
    valueFormatter: ({ hasIsolatedEquipment }) => booleanToHumanReadable(hasIsolatedEquipment),
    sort: (s) => s.sort(sortOnYesNo),
  },
];

function booleanToHumanReadable(val: boolean | undefined) {
  return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
  return b === 'No' ? -1 : 1;
}

function weekConverter(days: number | undefined) {
  if (days === undefined) {
    return '(Blank)';
  }
  const weeks = Math.ceil(days / 7);

  switch (true) {
    case weeks === 1: {
      return '1W or less';
    }
    case weeks === 2: {
      return '2W or less';
    }
    case weeks === 3: {
      return '3W or less';
    }
    case weeks === 4: {
      return '4W or less';
    }
    case weeks > 4 && weeks <= 7: {
      return 'More than 1 month';
    }
    case weeks > 7 && weeks <= 11: {
      return 'More than 2 months';
    }
    case weeks > 11 && weeks <= 15: {
      return 'More than 3 months';
    }
    case weeks > 15 && weeks <= 19: {
      return 'More than 4 months';
    }
    case weeks > 19 && weeks <= 23: {
      return 'More than 5 months';
    }
    default: {
      return 'More than 6 months';
    }
  }
}
