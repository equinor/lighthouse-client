import { chewPipetestDataFromApi } from '../../helpers/statusHelpers';

export const responseParser = async (response: Response) => {
    let json = JSON.parse(await response.text());
    json = chewPipetestDataFromApi(json);
    return json;
};
