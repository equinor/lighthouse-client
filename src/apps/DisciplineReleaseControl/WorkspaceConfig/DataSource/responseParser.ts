import { chewPipetestDataFromApi } from '../../Functions/statusHelpers';

export const responseParser = async (response: Response) => {
    let json = JSON.parse(await response.text());
    json = chewPipetestDataFromApi(json);
    return json;
};
