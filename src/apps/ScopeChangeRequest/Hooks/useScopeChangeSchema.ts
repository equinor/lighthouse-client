import { useFormSchema, Form } from '@equinor/form';
import { scopeChangeRequestSchema } from '../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { ScopeChangeRequestFormModel } from '../Types/scopeChangeRequestFormModel';

const createEmptyScopeChange = (): ScopeChangeRequestFormModel => ({
    title: '',
    description: '',
    category: '',
    //origin: '',
    // responsible: '',
    // phase: '',
    // guesstimateHrs: 0,
    // state: 'Closed',
    estimatedChangeHours: 0,
    actualChangeHours: 0,
    origin: '',
    phase: '',
});

export default (initialState?: ScopeChangeRequest): Form<ScopeChangeRequestFormModel> => {
    return useFormSchema(scopeChangeRequestSchema, initialState || createEmptyScopeChange());
};
