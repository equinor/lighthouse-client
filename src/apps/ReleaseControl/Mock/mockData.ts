import { CreateReleaseControlStepModel } from '../types/releaseControl';

export const testSteps: CreateReleaseControlStepModel[] = [
  {
    id: '5b627607-a655-4928-5f77-08da760df95f',
    name: 'Initiate',
    order: 1,
    completedStatusName: 'Initiated',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '85cf8513-294c-46c8-791c-08da760df95f',
        type: 'RequireProcosysUserSignature',
        assignToCreator: true,
        value: '',
        valueDescription: '',
      },
    ],
    criteriaTemplates: [
      {
        id: '85cf8513-294c-46c8-791c-08da760df95f',
        type: 'RequireProcosysUserSignature',
        assignToCreator: true,
        value: '',
        valueDescription: '',
      },
    ],
  },
  {
    order: 2,
    name: '',
    allowContributors: true,
    criteriaTemplates: [
      {
        assignToCreator: true,
        type: 'RequireProcosysUserSignature',
        value: '',
      },
    ],
    criterias: [],
  },
  {
    id: '18b2cf09-4d93-4d12-5f78-08da760df95f',
    name: 'Coordinator',
    order: 3,
    completedStatusName: 'Coordinated',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '83a601a8-1745-4de9-791d-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Coordinator',
        valueDescription: 'RC - Coordinator',
      },
    ],
    criteriaTemplates: [
      {
        id: '83a601a8-1745-4de9-791d-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Coordinator',
        valueDescription: 'RC - Coordinator',
      },
    ],
  },
  {
    id: '86e36b18-537f-4c0c-5f79-08da760df95f',
    name: 'Work prep',
    order: 4,
    completedStatusName: 'Work prep completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '4f484b9d-1c3b-450d-791e-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Work Prep.',
        valueDescription: 'RC - Work Prep.',
      },
    ],
    criteriaTemplates: [
      {
        id: '4f484b9d-1c3b-450d-791e-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Work Prep.',
        valueDescription: 'RC - Work Prep.',
      },
    ],
  },
  {
    id: '417c678e-b695-4370-5f7a-08da760df95f',
    name: 'Circuit isolation',
    order: 5,
    completedStatusName: 'Circuit isolation completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '64ae3fd3-ce84-4bb1-791f-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electro Comm.',
        valueDescription: 'RC - Electro Comm.',
      },
    ],
    criteriaTemplates: [
      {
        id: '64ae3fd3-ce84-4bb1-791f-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electro Comm.',
        valueDescription: 'RC - Electro Comm.',
      },
    ],
  },
  {
    id: '0782078d-c26c-4404-5f7b-08da760df95f',
    name: 'Demount ISO',
    order: 6,
    completedStatusName: 'Isolation demounted',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '0bd534f5-7cdf-4f2d-7920-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Insulation',
        valueDescription: 'RC - Insulation',
      },
    ],
    criteriaTemplates: [
      {
        id: '0bd534f5-7cdf-4f2d-7920-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Insulation',
        valueDescription: 'RC - Insulation',
      },
    ],
  },
  {
    id: '045a2bbf-6e92-4a8c-5f7c-08da760df95f',
    name: 'Check/demount HT',
    order: 7,
    completedStatusName: 'Check/demount HT completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: 'dc1a997e-c599-42bb-7921-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
    criteriaTemplates: [
      {
        id: 'dc1a997e-c599-42bb-7921-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
  },
  {
    id: '39de1c8b-ceaa-403f-5f7d-08da760df95f',
    name: 'Remount (or new) HT/A-test',
    order: 8,
    completedStatusName: 'A-test completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '4fa26058-6623-4255-7922-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
    criteriaTemplates: [
      {
        id: '4fa26058-6623-4255-7922-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
  },
  {
    id: '4c6fbc6f-943c-408e-5f7e-08da760df95f',
    name: 'Remount (or new) ISO',
    order: 9,
    completedStatusName: 'Isolation completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '857cbda2-5fd4-498a-7923-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Insulation',
        valueDescription: 'RC - Insulation',
      },
    ],
    criteriaTemplates: [
      {
        id: '857cbda2-5fd4-498a-7923-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Insulation',
        valueDescription: 'RC - Insulation',
      },
    ],
  },
  {
    id: 'd53fa83b-cce9-49b9-5f7f-08da760df95f',
    name: 'Remount (or new) HT/B-test',
    order: 10,
    completedStatusName: 'B-test completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: 'b9346889-6c4a-43d4-7924-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
    criteriaTemplates: [
      {
        id: 'b9346889-6c4a-43d4-7924-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
  },
  {
    id: 'f1fd75db-3c8a-4b01-5f80-08da760df95f',
    name: 'Circuit power-up',
    order: 11,
    completedStatusName: 'Circuit power-up completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '29fff40d-c85d-4d1d-7925-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electro Comm.',
        valueDescription: 'RC - Electro Comm.',
      },
    ],
    criteriaTemplates: [
      {
        id: '29fff40d-c85d-4d1d-7925-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electro Comm.',
        valueDescription: 'RC - Electro Comm.',
      },
    ],
  },
  {
    id: '600c2717-dc00-417a-5f81-08da760df95f',
    name: 'Remount (or new) HT/C-test',
    order: 12,
    completedStatusName: 'C-test completed',
    rejectedStatusName: undefined,
    allowContributors: true,
    criterias: [],
    workflowStepCriteriaTemplates: [
      {
        id: '782977dd-174d-44d6-7926-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
    criteriaTemplates: [
      {
        id: '782977dd-174d-44d6-7926-08da760df95f',
        type: 'RequireProcosysFunctionalRoleSignature',
        assignToCreator: false,
        value: 'RC - Electrical',
        valueDescription: 'RC - Electrical',
      },
    ],
  },
];
