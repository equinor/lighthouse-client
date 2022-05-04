import { Atom } from '@dbeining/react-atom';
import { CriteriaSignState } from '../../../types/scopeChangeRequest';

export interface SigningAction {
    buttonText: string;
    action: CriteriaSignState | 'Reassign';
    criteriaId: string;
    stepId: string;
}

export const actionWithCommentAtom = Atom.of<SigningAction | null>(null);
