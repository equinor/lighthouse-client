export type JobStatuses = {
    status: string;
    weekUpdated: Date;
};
export type Job = {
    discipline: string;
    disciplineDescription: string;
    job: string;
    jobName: string;
    jobStatus: string;
    jobEstimatedHours: number;
    jobStatuses: JobStatuses[];
};
// export type WorkOrder = {
//     [index: string]: any;
//     siteCodes: string[];
//     projectIdentifier: string;
//     workOrderNumber: string;
//     description: string;
//     disciplineCode: string;
//     discipline: string;
//     responsibleCode: string;
//     responsible: string;
//     milestone: string;
//     milestoneCode: string;
//     onshore: boolean;
//     offshore: boolean;
//     materialStatus: string;
//     plannedStartDate: string;
//     plannedFinishDate: string;
//     w1ActualDate: string;
//     w2ActualDate: string;
//     w3ActualDate: string;
//     w4ActualDate: string;
//     w5ActualDate: string;
//     w6ActualDate: string;
//     w7ActualDate: string;
//     w8ActualDate: string;
//     w9ActualDate: string;
//     w10ActualDate: string;
//     commpkgNumber: string;
//     workOrderId: string;
//     proCoSysSiteName: string;
//     materialComments: string;
//     constructionComments: string;
//     projectProgress: string;
//     estimatedHours: number;
//     remainingHours: number;
//     expendedHours: number;
//     url: string;
//     order: number;
//     hourType: string;
//     mccrStatus: string;
//     holdBy: string;
//     holdByDescription: string;
//     date: string;
//     rowKey: string;
//     searchableValues: string;
//     projectDescription: string;
// };
export type WorkOrder = {
    plant: string;
    plantName: string;
    projectName: string;
    woNo: string;
    commPkgNo: string;
    title: string;
    description: string;
    mileStoneCode: string;
    milestoneDescription: string;
    materialStatusCode: string;
    categoryCode: string;
    holdByCode: string;
    responsibleCode: string;
    responsibleDescription: string;
    areaCode: string;
    areaDescription: string;
    jobStatusCode: string;
    typeOfWorkCode: string;
    onShoreOffShoreCode: string;
    woTypeCode: string;
    projectProgress: string;
    expendedManHours: string;
    estimatedManHours: string;
    remainingManHours: string;
    plannedStartAtDate: string;
    actualStartAtDate: string;
    plannedFinishedAtDate: string;
    actualFinishAtDate: string;
    createdAt: string;
    lastUpdated: string;
    disciplineDescription: string;
    jobStatusCutoffs: {
        status: string;
        weeks: string[];
    }[];
};
export type WorkOrderApi = {
    items: WorkOrder[];
};
export const mockData = (): Job[] => {
    const jobs: Job[] = JSON.parse(`[
    {
      "discipline": "LX",
      "disciplineDescription": "Insulation",
      "job": "LX05002L306",
      "jobName": "(KSI) Install Boxes on Piping Test no. 5002-L306",
      "jobStatus": "E40",
      "jobEstimatedHours": "31,56"
      
    },
    {
      "discipline": "LX",
      "disciplineDescription": "Insulation",
      "job": "LX05002L307",
      "jobName": "(KSI) Install Boxes on Piping Test no. 5002-L307",
      "jobStatus": "E40",
      "jobEstimatedHours": "15,97"
    },
    {
      "discipline": "LE",
      "disciplineDescription": "Electrical",
      "job": "501752",
      "jobName": "Test HV cable AV100 - AF100 (Flare tower)",
      "jobStatus": "E40",
      "jobEstimatedHours": "15,17"
    },
    {
      "discipline": "LE",
      "disciplineDescription": "Electrical",
      "job": "502013",
      "jobName": "Hook-up Term. Test Electro Cable - AF100",
      "jobStatus": "E40",
      "jobEstimatedHours": "166,07"
    },
    {
      "discipline": "LE",
      "disciplineDescription": "Electrical",
      "job": "500089",
      "jobName": "Term Electro Cable 82EL039-E-KSI",
      "jobStatus": "E40",
      "jobEstimatedHours": "11,34"
    },
    {
      "discipline": "LE",
      "disciplineDescription": "Electrical",
      "job": "500085",
      "jobName": "Term Electro Cable 82EL035-518-B01-E-KSI",
      "jobStatus": "E40",
      "jobEstimatedHours": "9,68"
    },
     {
        "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1620084KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "8,36"
          },
          {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74"
          }
  ]`);

    return jobs.map((j) => ({
        ...j,
        jobEstimatedHours: parseFloat(j.jobEstimatedHours as any as string) || 0,
    }));
};
