import { Schema } from '@equinor/Form';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface Category {
    name: string;
}

export const scopeChangeRequestSchema: Schema<ScopeChangeRequest> = {
    title: {
        title: 'Title',
        inputType: { type: 'TextInput' },
        order: 1,
    },
    phase: {
        title: 'Phase',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getPhases();
            },
        },
        order: 2,
    },

    category: {
        title: 'Category',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getCategories();
            },
        },
        order: 3,
    },
    origin: {
        title: 'Origin',
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getOrigins();
            },
        },
        order: 3,
    },
    description: {
        title: 'Description',
        inputType: { type: 'TextArea' },
        order: 4,
    },
};

const getCategories = async (): Promise<string[]> => {
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/categories`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

const getOrigins = async (): Promise<string[]> => {
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/origins`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

const getPhases = async (): Promise<string[]> => {
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/phases`,
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};
