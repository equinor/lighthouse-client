import { WorkOrder, WorkOrderApi } from './mockData';

export const mock = (): WorkOrder[] => {
    const data: WorkOrderApi[] = JSON.parse(
        `[
{
  "items": [
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LX82002L004",
      "woId": "116259276",
      "commPkgNo": "2050-M01",
      "title": "KST-Insulate Tubing - Test 2002-L004",
      "description": "",
      "mileStoneCode": "",
      "milestoneDescription": "",
      "materialStatusCode": "",
      "categoryCode": "",
      "holdByCode": "ENG",
      "responsibleCode": "KSF",
      "responsibleDescription": "Kværner Stord Fabrication",
      "areaCode": "",
      "areaDescription": "",
      "jobStatusCode": "W02",
      "typeOfWorkCode": "",
      "onShoreOffShoreCode": "A",
      "woTypeCode": "",
      "projectProgress": "0",
      "expendedManHours": "",
      "createdAt": "2020.02.01",
      "lastUpdated": "2021-09-06T02:18:06.646Z",
      "plannedFinishDate": "01/15/2022",
      "plannedStartAtDate": "01/17/2022",
      "disciplineDescription": "Engineering",
      "jobStatusCutoffs": [
       {
          "status": "W01",
          "weeks": [
            "08/23/2021"
          ]
        },
        {
          "status": "W03",
          "weeks": [
            "08/30/2021"
          ]
        },
        {
          "status": "W04",
          "weeks": [
            "09/06/2021",
            "09/13/2021"
          ]
        }
      ]
    },
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LX82002L004",
      "woId": "116259276",
      "commPkgNo": "2050-M01",
      "title": "KST-Insulate Tubing - Test 2002-L004",
      "description": "",
      "mileStoneCode": "",
      "milestoneDescription": "",
      "materialStatusCode": "",
      "categoryCode": "",
      "holdByCode": "ENG",
      "responsibleCode": "KSF",
      "responsibleDescription": "Kværner Stord Fabrication",
      "areaCode": "",
      "areaDescription": "",
      "jobStatusCode": "W02",
      "typeOfWorkCode": "",
      "onShoreOffShoreCode": "A",
      "woTypeCode": "",
      "projectProgress": "0",
      "expendedManHours": "",
      "createdAt": "2020.02.01",
      "lastUpdated": "2021-09-06T02:18:06.646Z",
      "plannedFinishDate": "01/15/2022",
      "plannedStartAtDate": "01/19/2022",
      "disciplineDescription": "Engineering",
      "jobStatusCutoffs": [
         {
          "status": "W01",
          "weeks": [
            "09/13/2021"
          ]
        }
      ]
    },
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LM65602L011FM-0478",
      "woId": "116259276",
      "commPkgNo": "5650-M01",
      "title": "FM-0478_Painting Test 5602-L011",
      "description": "",
      "mileStoneCode": "",
      "milestoneDescription": "",
      "materialStatusCode": "MN",
      "categoryCode": "",
      "holdByCode": "",
      "responsibleCode": "KEF",
      "responsibleDescription": "Kværner Egersund Fabrication",
      "areaCode": "",
      "areaDescription": "",
      "jobStatusCode": "W01",
      "typeOfWorkCode": "",
      "onShoreOffShoreCode": "A",
      "woTypeCode": "",
      "projectProgress": "100",
      "expendedManHours": "",
      "createdAt": "2021.05.25",
      "lastUpdated": "2021-09-06T02:18:10.362Z",
      "plannedFinishDate": "01/20/2022",
      "disciplineDescription": "Engineering",
      "jobStatusCutoffs": [
       {
          "status": "W01",
          "weeks": [
            "08/23/2021"
          ]
        },
        {
          "status": "W04",
          "weeks": [
            "08/30/2021",
            "09/06/2021"
          ]
        },
        {
        "status": "W05",
        "weeks": [
          "09/13/2021"
        ]
      }
      ]
    },
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LX17103L325-02",
      "woId": "116259276",
      "commPkgNo": "7150-M01",
      "title": "(KSI) Prefabrication of Boxes on Piping Test no. 7103-L325",
      "description": "",
      "mileStoneCode": "",
      "milestoneDescription": "",
      "materialStatusCode": "",
      "categoryCode": "",
      "holdByCode": "",
      "responsibleCode": "KSF",
      "responsibleDescription": "Kværner Stord Fabrication",
      "areaCode": "",
      "areaDescription": "",
      "jobStatusCode": "W03",
      "typeOfWorkCode": "",
      "onShoreOffShoreCode": "A",
      "woTypeCode": "",
      "projectProgress": "0",
      "expendedManHours": "",
      "createdAt": "2021.05.11",
      "lastUpdated": "2021-09-06T02:18:10.475Z",
      "plannedFinishDate": "01/20/2022",
      "plannedStartAtDate": "02/01/2022",
      "disciplineDescription": "Insulation",
      "jobStatusCutoffs": [
       {
          "status": "W01",
          "weeks": [
            "08/23/2021"
          ]
        },
       {
          "status": "W02",
          "weeks": [
            "08/30/2021"
          ]
        },
        {
          "status": "W03",
          "weeks": [
            "09/06/2021",
            "09/13/2021"
          ]
        }
      ]
    },
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LX17103L325-02",
      "woId": "116259276",
      "commPkgNo": "7150-M01",
      "title": "(KSI) Prefabrication of Boxes on Piping Test no. 7103-L325",
      "description": "",
      "mileStoneCode": "",
      "milestoneDescription": "",
      "materialStatusCode": "",
      "categoryCode": "",
      "holdByCode": "",
      "responsibleCode": "KSF",
      "responsibleDescription": "Kværner Stord Fabrication",
      "areaCode": "",
      "areaDescription": "",
      "jobStatusCode": "W03",
      "typeOfWorkCode": "",
      "onShoreOffShoreCode": "A",
      "woTypeCode": "",
      "projectProgress": "0",
      "expendedManHours": "",
      "createdAt": "2021.05.11",
      "lastUpdated": "2021-09-06T02:18:10.475Z",
      "plannedFinishDate": "01/20/2022",
      "plannedStartAtDate": "02/01/2022",
      "disciplineDescription": "Insulation",
      "jobStatusCutoffs": [
       {
          "status": "W01",
          "weeks": [
            "08/23/2021"
          ]
        },
        {
          "status": "W02",
          "weeks": [
            "08/30/2021"
          ]
        },
        {
          "status": "W03",
          "weeks": [
            "09/06/2021"
          ]
        },
        {
          "status": "W04",
          "weeks": [
            "09/13/2021"
          ]
        }
      ]
    }
  ],
  "pageNumber": 100,
  "totalPages": 19622,
  "totalCount": 58866,
  "hasPreviousPage": true,
  "hasNextPage": true
}
]`
    );
    return data.flatMap((j) => j.items);
};
