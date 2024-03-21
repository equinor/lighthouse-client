import { Atom, swap } from '@dbeining/react-atom';
import { CriteriaSignState } from '@equinor/Workflow';

export interface SigningAction {
  buttonText: string;
  action: CriteriaSignState | 'Reassign';
  criteriaId: string;
  stepId: string;
}

export const actionWithCommentAtom = Atom.of<SigningAction | null>(null);

export function resetSigningAtom(): void {
  swap(actionWithCommentAtom, () => null);
}
