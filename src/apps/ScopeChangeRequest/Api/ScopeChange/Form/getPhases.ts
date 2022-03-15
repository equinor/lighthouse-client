import { httpClient } from '../../../../../Core/Client/Functions';

export const getPhases = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();

    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await scopeChange
        .fetch(`api/phases`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Phase) => x.name);
        });

    return selectOptions;
};

interface Phase {
    name: string;
}
