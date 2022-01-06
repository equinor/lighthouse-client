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
