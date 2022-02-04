import { HttpClient } from '@equinor/http-client';
import { TypedSelectOption } from '../searchType';
import { System } from './Types/system';

export async function searchSystems(
    searchString: string,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> {
    const selectOptions: TypedSelectOption[] = [];
    const res: Promise<System[]> = await procosysClient
        .fetch(
            'api/Systems?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&onlyActiveSystems=true&api-version=4.1'
        )
        .then((x) => x.json());

    try {
        (await res)
            .filter((x) => x.Code.includes(searchString))
            .map((x) =>
                selectOptions.push({
                    label: `SYS_${x.Code} - ${x.Description}`,
                    value: x.Id,
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
