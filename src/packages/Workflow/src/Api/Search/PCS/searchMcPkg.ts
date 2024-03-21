import { HttpClient } from '@equinor/http-client';
import { McPkg } from '../../../Types/ProCoSys/McPkg';
import { TypedSelectOption } from '../searchType';

export const searchMcPkg = async (
  searchString: string,
  plantId: string,
  procosysClient: HttpClient,
  signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
  const selectOptions: TypedSelectOption[] = [];

  const uri = 'api/McPkg/Search';
  const queryParameters = `plantId=${encodeURIComponent(
    plantId
  )}&startsWithMcPkgNo=${encodeURIComponent(
    searchString
  )}&includeClosedProjects=false&api-version=4.1`;
  const url = `${uri}?${queryParameters}`;
  await procosysClient
    .fetch(url, { signal })
    .then((response) => response.json())
    .then((data) => {
      data['Items'].map((x: McPkg) => {
        selectOptions.push({
          label: `${x.McPkgNo} - ${x.Description}`,
          value: x.McPkgNo,
          type: 'mcpkg',
          searchValue: x.McPkgNo,
          object: x,
          metadata: `Comm pkg: ${x.CommPkgNo}`,
        });
      });
    });

  return selectOptions || [];
};
