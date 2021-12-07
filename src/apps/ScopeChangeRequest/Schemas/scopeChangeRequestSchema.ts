import { Schema } from '@equinor/form';
import { ScopeChangeRequestFormModel } from '../Types/scopeChangeRequestFormModel';
import { getCategories } from '../Api/getCategories';
import { getOrigins } from '../Api/getOrigins';
import { getResponsibles } from '../Api/getResponsibles';
export const scopeChangeRequestSchema: Schema<ScopeChangeRequestFormModel> = {
    title: {
        isRequired: true,
        label: 'Title',
        editable: true,
        inputType: { type: 'TextInput' },
        order: 0,
        validationFunction: (value: string) => {
            if (value.length > 2) {
                return true;
            } else {
                return false;
            }
        },
    },
    description: {
        isRequired: true,
        label: 'Description',
        editable: true,
        inputType: { type: 'TextArea' },
        order: 1,
    },
    category: {
        isRequired: true,
        label: 'Category',
        editable: true,
        inputType: { type: 'SingleSelect', selectOptions: getCategories() },
        order: 2,
    },
    origin: {
        isRequired: true,
        label: 'Origin',
        editable: true,
        inputType: { type: 'SingleSelect', selectOptions: getOrigins() },
        order: 2,
    },
    responsible: {
        isRequired: true,
        label: 'Responsible',
        editable: true,
        inputType: { type: 'SingleSelect', selectOptions: getResponsibles() },
        order: 3,
    },
    phase: {
        isRequired: true,
        label: 'Phase',
        editable: false,
        inputType: { type: 'TextInput' },
        order: 4,
    },
    guesstimateHrs: {
        isRequired: true,
        label: 'Guesstimate',
        editable: true,
        inputType: { type: 'NumberInput' },
        order: 5,
    },
    tags: {
        isRequired: true,
        label: 'Tags',
        editable: true,
        inputType: {
            type: 'MultiSelect',
            selectOptions: () => {
                return ['1', '2'];
            },
        },
        order: 6,
    },
};
