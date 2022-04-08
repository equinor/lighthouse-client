import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { System } from '../../../types/ProCoSys/system';

export async function searchSystems(
    searchString: string,
    procosysClient: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const selectOptions: TypedSelectOption[] = [];
    const res: Promise<System[]> = await procosysClient
        .fetch(
            'api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1',
            { signal }
        )
        .then((x) => x.json());

    try {
        (await res)
            .filter((x) => x.Code.includes(searchString))
            .map((x) =>
                selectOptions.push({
                    label: `${x.Code} - ${x.Description}`,
                    value: x.Id.toString(),
                    searchValue: x.Code,
                    type: 'system',
                    object: x,
                })
            );
    } catch (e) {
        console.error(e);
    }
    return selectOptions;
}
