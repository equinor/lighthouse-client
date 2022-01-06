import { Job } from './mockData';

export const newMock = (): Job[] => {
    const data: Job[] = JSON.parse(
        `[
 {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74",
            "jobStatuses": [
                {
                    "status": "W01",
                    "weekUpdated": "25.04.2021"
                },

                {
                    "status": "W02",
                    "weekUpdated": "27.05.2021"
                },
                {
                    "status": "W03",
                    "weekUpdated": "30.08.2021"
                }
            ],
	    
        },
        {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74",
            "jobStatuses": [
                {
                    "status": "W01",
                    "weekUpdated": "12.10.2021"
                }
            ]
        },
        {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74",
            "jobStatuses": [
                {
                    "status": "W01",
                    "weekUpdated": "30.11.2021"
                }
            ]
        },
        {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74",
            "jobStatuses": [
                {
                    "status": "W01",
                    "weekUpdated": "30.12.2021"
                }
            ]
        },
        {
            "discipline": "LL",
            "disciplineDescription": "Piping",
            "job": "LL1630750KST",
            "jobName": "IC Prefab Piping, AZV14FAV50 - Hook-Up between AV100 and Poop Deck",
            "jobStatus": "C160",
            "jobEstimatedHours": "13,74",
            "jobStatuses": [
                {
                    "status": "W01",
                    "weekUpdated": "30.05.2021"
                }
            ]
        }
		]`
    );
    return data.map((j) => ({
        ...j,
        jobEstimatedHours: parseFloat(j.jobEstimatedHours as any as string) || 0,
    }));
};
