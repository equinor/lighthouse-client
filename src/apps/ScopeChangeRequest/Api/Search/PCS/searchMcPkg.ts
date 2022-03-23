import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { MechanicalCompletionPackage } from '../../../Types/ProCoSys/mcPkg';

export const searchMcPkg = async (
    searchString: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const uri = 'api/McPkg/Search';
    const queryParameters = `plantId=PCS%24JOHAN_CASTBERG&startsWithMcPkgNo=${encodeURIComponent(
        searchString
    )}&includeClosedProjects=false&itemsPerPage=10&includeVoidedCommPkgs=true&includeDecommissioningPkgs=false&api-version=4.1`;
    const url = `${uri}?${queryParameters}`;
    await procosysClient
        .fetch(url, { signal })
        .then((response) => response.json())
        .then((data) => {
            data['Items'].map((x: MechanicalCompletionPackage) => {
                selectOptions.push({
                    label: `${x.McPkgNo} - ${x.Description}`,
                    value: x.McPkgNo,
                    type: 'mcpkg',
                    searchValue: x.McPkgNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
