import { Schema } from '@equinor/Form';
import { httpClient } from '../../../../Core/Client/Functions';
import { DisciplineReleaseControl } from '../../Types/disciplineReleaseControl';

interface Category {
    name: string;
}

export const releaseControlProcessSchema: Schema<DisciplineReleaseControl> = {
    title: {
        title: 'Title/ID',
        inputType: { type: 'TextInput' },
        order: 1,
        placeholderText: 'Please add title/id for the process',
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
    originSourceId: {
        optional: true,
    },

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
    const { releaseControls } = httpClient();
    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await releaseControls
        .fetch(`api/categories`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};

const getPhases = async (): Promise<string[]> => {
    const { releaseControls } = httpClient();

    let selectOptions: string[] = [];
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    await releaseControls
        .fetch(`api/phases`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            selectOptions = data.map((x: Category) => x.name);
        });

    return selectOptions;
};
