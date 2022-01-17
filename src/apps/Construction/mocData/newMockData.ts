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
      "plannedStartAtDate": "01/18/2022",
      "disciplineDescription": "Engineering",
      "jobStatusCutoffs": [
        {
          "status": "W03",
          "weeks": [
            "08/30/2021"
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
          "status": "W04",
          "weeks": [
<<<<<<< HEAD
=======
            "04/13/2020",
            "04/20/2020",
            "04/27/2020",
            "05/04/2020",
            "05/11/2020",
            "05/18/2020",
            "05/25/2020",
            "06/01/2020",
            "06/08/2020",
            "06/15/2020",
            "06/22/2020",
            "06/29/2020",
            "07/06/2020",
            "07/13/2020",
            "07/20/2020",
            "07/27/2020",
            "08/03/2020",
            "08/10/2020",
            "08/17/2020",
            "08/24/2020",
            "08/31/2020",
            "09/07/2020",
            "09/14/2020",
            "09/21/2020",
            "09/28/2020",
            "10/05/2020",
            "10/12/2020",
            "10/19/2020",
            "10/26/2020",
            "11/02/2020",
            "11/09/2020",
            "11/16/2020",
            "11/23/2020",
            "11/30/2020",
            "12/07/2020",
            "12/14/2020",
            "12/21/2020",
            "12/28/2020",
            "01/04/2021",
            "01/11/2021",
            "01/18/2021",
            "01/27/2021",
            "02/01/2021",
            "02/08/2021",
            "02/15/2021",
            "02/22/2021",
            "03/01/2021",
            "03/08/2021",
            "03/15/2021",
            "03/22/2021",
            "03/29/2021",
            "04/05/2021",
            "04/12/2021",
            "04/19/2021",
            "04/26/2021",
            "05/03/2021",
            "05/10/2021",
            "05/17/2021",
            "05/24/2021",
            "05/31/2021",
            "06/07/2021",
            "06/14/2021",
            "06/21/2021",
            "06/28/2021",
            "07/05/2021",
            "07/12/2021",
            "07/19/2021",
            "07/26/2021",
            "08/02/2021",
            "08/09/2021",
            "08/16/2021",
            "08/23/2021",
            "08/30/2021",
>>>>>>> 88a053c13d1e06cc33b70b46c088e22a39fb2c4d
            "09/06/2021"
          ]
        }
      ]
    },
    {
      "plant": "PCS$JOHAN_CASTBERG",
      "plantName": "Johan Castberg",
      "projectName": "L.O532C.002",
      "woNo": "LX17103L325-02",
<<<<<<< HEAD
      "woId": "116259276",
=======
>>>>>>> 88a053c13d1e06cc33b70b46c088e22a39fb2c4d
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
          "status": "W03",
          "weeks": [
            "08/30/2021"
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
