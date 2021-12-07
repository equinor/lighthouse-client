import { ScopeChangeRequest } from './scopeChangeRequest';

export type ScopeChangeRequestFormModel = Omit<
    ScopeChangeRequest,
    'id' | 'created' | 'actualHrs' | 'milestone'
>;
