import { HttpClient } from '@equinor/http-client';
import { PCSStructure, Query, TypedSelectOption } from '@equinor/Workflow';
import { isProduction } from '../../../../../Core/Client/Functions';

export const searchQueryOrigin = async (
  searchString: string,
  plantId: string,
  client: HttpClient,
  signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
  const selectOptions: TypedSelectOption[] = [];

  const searchIdDev = 105263;
  const searchIdProd = 114620;

  const search: PCSStructure[] = [
    {
      Key: 'DocumentDocumentNo',
      Value: searchString,
    },
  ];

  const requestOptions = {
    method: 'POST',
    headers: { ['content-type']: 'application/json' },
    body: JSON.stringify(search),
    signal,
  };
  try {
    await client
      .fetch(
        `api/Search?plantId=${encodeURIComponent(plantId)}&savedSearchId=${
          isProduction() ? searchIdProd : searchIdDev
        }&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
        requestOptions
      )
      .then((response) => response.json())
      .then((data) => {
        data.map((x: Query) => {
          selectOptions.push({
            label: x.DocumentNo,
            value: x.DocumentNo,
            type: 'Query',
            searchValue: x.DocumentNo,
            object: x,
          });
        });
      });
  } catch (e) {
    console.warn(e);
  }
  return selectOptions || [];
};
