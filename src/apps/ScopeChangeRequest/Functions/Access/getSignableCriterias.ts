import { Criteria } from '../../Types/scopeChangeRequest';

export type StrippedCriteria = Pick<Criteria, 'id' | 'value' | 'signedState'>;
