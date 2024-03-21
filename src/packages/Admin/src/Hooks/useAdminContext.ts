import { DeepImmutable, deref, useAtom } from '@dbeining/react-atom';
import { AdminAtom, adminAtom } from '../Atoms/adminAtom';

type SelectorFunction<T, R> = (s: T) => R;

export function useAdminContext<R = AdminAtom>(
  selector?: SelectorFunction<AdminAtom, R>
): DeepImmutable<R> {
  const select = selector ? selector : (s: AdminAtom) => s;

  return useAtom(adminAtom, { select: select as (s: AdminAtom) => R });
}

export function getAdminSnapshot(): AdminAtom {
  return deref(adminAtom);
}
