import { BaseClient } from '@equinor/http-client';

interface SelectOption {
    value: string;
    label: string;
}

interface CommPkg {
    Id: string;
    CommPkgNo: string;
    Description: string;
}

export const searchCommPkg = async (
    searchString: string,
    procosysClient: BaseClient
): Promise<SelectOption[]> => {
    const selectOptions: SelectOption[] = [];

    try {
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
                    });
                });
            });
    } catch (e) {
        console.log(e);
    }

    console.log(selectOptions);
    return selectOptions || [];
};
