import { Schema } from '@equinor/form';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface Category {
    name: string;
}

export const scopeChangeRequestSchema: Schema<ScopeChangeRequest> = {
    title: {
        isRequired: true,
        label: 'Title',
        editable: true,
        inputType: { type: 'TextInput' },
        order: 1,
        validationFunction: (value: string) => {
            if (!value) {
                return false;
            }
            if (value.length > 2) {
                return true;
            } else {
                return false;
            }
        },
    },
    phase: {
        isRequired: true,
        label: 'Phase',
        editable: true,
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getPhases();
            },
        },
        order: 2,
    },

    category: {
        isRequired: true,
        label: 'Category',
        editable: true,
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getCategories();
            },
        },
        order: 3,
    },
    origin: {
        isRequired: true,
        label: 'Origin',
        editable: true,
        inputType: {
            type: 'SingleSelect',
            selectOptions: async () => {
                return await getOrigins();
            },
        },
        order: 3,
    },
    description: {
        isRequired: true,
        label: 'Description',
        editable: true,
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
