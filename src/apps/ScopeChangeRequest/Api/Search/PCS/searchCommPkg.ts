import { BaseClient } from '@equinor/http-client';
import { CommPkg } from './Types/commpkg';
import { TypedSelectOption } from '../searchType';

export const searchCommPkg = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const baseUrl = 'https://procosyswebapi.equinor.com/api';
    const uri = 'CommPkg/Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&startsWithCommPkgNo=${encodeURIComponent(
        searchString
    )}&includeClosedProjects=false&itemsPerPage=10&includeVoidedCommPkgs=true&includeDecommissioningPkgs=false&api-version=4.1`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    await procosysClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data['Items'].map((x: CommPkg) => {
                selectOptions.push({
                    label: `${x.CommPkgNo} - ${x.Description}`,
                    value: x.CommPkgNo,
                    type: 'commpkg',
                    searchValue: x.CommPkgNo,
                });
            });
        });

    return selectOptions || [];
};
