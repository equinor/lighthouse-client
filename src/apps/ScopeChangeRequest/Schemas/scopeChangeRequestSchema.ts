import { Schema } from '@equinor/Form';
import { httpClient } from '../../../Core/Client/Functions/HttpClient';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

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
        title: 'Change category',
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
            selectOptions: ['NCR', 'DCN', 'Query', 'Punch', 'SWCR', 'NotApplicable'],
        },
        order: 3,
        placeholderText: 'Select origin',
    },
    originSourceId: {
        optional: true,
    },

    description: {
        title: 'Scope description',
        inputType: { type: 'TextArea' },
        order: 4,
        placeholderText: 'Please add description',
    },
    guesstimateHours: {
        title: 'Guess direct Mhrs',
        optional: false,
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
