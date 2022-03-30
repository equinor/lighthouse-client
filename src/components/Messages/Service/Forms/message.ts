import { Schema } from "@equinor/Form";
import { ServiceMessage } from "../Types/serviceMessage";

export const messageForm: Schema<Omit<ServiceMessage, 'id'>> = {
    message: {
        title: 'Message',
        inputType: { type: 'TextArea' },
        order: 1,
        placeholderText: 'Please add Message',
    },
    type: {
        title: 'Chose Type',
        inputType: {
            type: 'SingleSelect',
            selectOptions: ['info', 'warning', 'default'],
        },
        order: 3,
        placeholderText: 'Select Type',
    },
    fromDate: {
        title: 'From Date',
        inputType: { type: 'Date' },
        order: 4,
    },
    toDate: {
        title: 'To Date',
        inputType: { type: 'Date' },
        order: 4,
    },

};