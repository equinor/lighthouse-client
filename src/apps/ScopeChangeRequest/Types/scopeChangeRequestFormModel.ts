import { ScopeChangeRequest } from './scopeChangeRequest';

export type ScopeChangeRequestFormModel = Omit<
    ScopeChangeRequest,
    | 'id'
    | 'created'
    | 'actualHrs'
    | 'created'
    | 'createdBy'
    | 'lastModified'
    | 'lastModifiedBy'
    | 'state'
>;
