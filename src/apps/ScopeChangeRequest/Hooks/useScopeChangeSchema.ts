import { useFormSchema } from '@equinor/form';
import { Form } from '../../../packages/Form/Types/form';
import { scopeChangeRequestSchema } from '../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { ScopeChangeRequestFormModel } from '../Types/scopeChangeRequestFormModel';

const createEmptyScopeChange = (): ScopeChangeRequestFormModel => ({
    title: '',
    description: '',
    category: '',
    origin: '',
    responsible: '',
    phase: '',
    guesstimateHrs: 0,
    state: 'Closed',
    trigger: '',
});

export default (initialState?: ScopeChangeRequest): Form<ScopeChangeRequestFormModel> => {
    return useFormSchema(scopeChangeRequestSchema, initialState || createEmptyScopeChange());
};
