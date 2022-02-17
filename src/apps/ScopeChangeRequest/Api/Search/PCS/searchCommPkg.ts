import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { CommPkg } from './Types/commpkg';

export const searchCommPkg = async (
    searchString: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const uri = 'api/CommPkg/Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&startsWithCommPkgNo=${encodeURIComponent(
        searchString
    )}&includeClosedProjects=false&itemsPerPage=10&includeVoidedCommPkgs=true&includeDecommissioningPkgs=false&api-version=4.1`;
    const url = `${uri}?${queryParameters}`;
    await procosysClient
        .fetch(url, { signal })
        .then((response) => response.json())
        .then((data) => {
            data['Items'].map((x: CommPkg) => {
                selectOptions.push({
                    label: `${x.CommPkgNo} - ${x.Description}`,
                    value: x.CommPkgNo,
                    type: 'commpkg',
                    searchValue: x.CommPkgNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
