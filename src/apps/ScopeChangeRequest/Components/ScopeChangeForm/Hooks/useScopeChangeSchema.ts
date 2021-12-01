import useFormSchema, { Form, Schema } from '../../../../../hooks/Form/useFormSchema';
import { ScopeChangeRequest } from '../../../ScopeChangeRequestApp';

export type ScopeChangeRequestFormModel = Omit<
    ScopeChangeRequest,
    'id' | 'phase' | 'state' | 'created' | 'guesstimateHrs' | 'actualHrs' | 'milestone'
>;

const scopeChangeRequestSchema: Schema<ScopeChangeRequestFormModel> = {
    title: {
        isRequired: true,
        label: 'Title',
    },
    description: {
        isRequired: true,
        label: 'Description',
    },

    category: {
        isRequired: true,
        label: 'Category',
    },
    origin: {
        isRequired: true,
        label: 'Origin',
    },
    responsible: {
        isRequired: true,
        label: 'Responsible',
    },
    comments: {
        isRequired: false,
        label: 'Comments',
    },
};

const createEmptyScopeChange = (): ScopeChangeRequestFormModel => ({
    title: '',
    description: '',
    category: '',
    origin: '',
    responsible: '',
});

export default (initialState?: ScopeChangeRequest): Form<ScopeChangeRequestFormModel> => {
    return useFormSchema(scopeChangeRequestSchema, initialState || createEmptyScopeChange());
};
