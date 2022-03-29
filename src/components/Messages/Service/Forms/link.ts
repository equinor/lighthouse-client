import { Schema } from "@equinor/Form";
import { Link } from "../Types/serviceMessage";

export const linkForm: Schema<Link> = {
    title: {
        title: 'Link Title',
        inputType: { type: 'TextInput' },
        order: 1,
        optional: true,
        placeholderText: 'Please add Link Title',

    },
    url: {
        title: 'Url',
        inputType: {
            type: 'TextInput',
        },
        order: 1,
        optional: true,
        placeholderText: 'Please add Link Url',
    },
};