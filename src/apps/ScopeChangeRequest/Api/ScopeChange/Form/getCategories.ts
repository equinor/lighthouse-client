import { httpClient } from '../../../../../Core/Client/Functions';

/**
 * @returns
 */
export const getCategories = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await scopeChange
        .fetch(`api/categories`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

interface Category {
    name: string;
}
