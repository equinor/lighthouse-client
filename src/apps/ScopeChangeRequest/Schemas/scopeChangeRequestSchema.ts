import { Schema } from '@equinor/Form';
import { httpClient } from '../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface Category {
    name: string;
}

export const scopeChangeRequestSchema: Schema<ScopeChangeRequest> = {
    title: {
        title: 'Title',
        inputType: { type: 'TextInput' },
        order: 1,
        placeholderText: 'Please add title for the request',
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
        placeholderText: 'Select phase',
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
        placeholderText: 'Select category',
    },
    originSource: {
        title: 'Change origin',
        inputType: {
            type: 'SingleSelect',
            selectOptions: ['NCR', 'DCN', 'Query', 'Punch', 'NotApplicable'],
        },
        order: 3,
        placeholderText: 'Select origin',
    },
    originSourceId: {},

    description: {
        title: 'Description',
        inputType: { type: 'TextArea' },
        order: 4,
        placeholderText: 'Please add description',
    },
    guesstimateHours: {
        title: 'Guesstimate hours',
        optional: true,
        inputType: { type: 'NumberInput' },
        order: 5,
    },
    guesstimateDescription: {
        title: 'Guesstimate description',
        optional: true,
        inputType: { type: 'TextInput' },
        order: 5,
        placeholderText: 'Please make your best guess...',
    },
};

/**
 * TODO: Move
 * @returns
 */
const getCategories = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await scopeChange
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/categories`,
            requestOptions
        )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

const getPhases = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();

    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await scopeChange
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/phases`,
            requestOptions
        )
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};
