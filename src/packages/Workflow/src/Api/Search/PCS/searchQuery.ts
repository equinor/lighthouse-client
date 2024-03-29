import { HttpClient } from '@equinor/http-client';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { Query } from '../../../Types/ProCoSys/query';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export const searchQueryOrigin = async (
  searchString: string,
  plantId: string,
  client: IHttpClient,
  signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
  const selectOptions: TypedSelectOption[] = [];

  const searchIdDev = 105215;
  const searchIdProd = 105670;

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
