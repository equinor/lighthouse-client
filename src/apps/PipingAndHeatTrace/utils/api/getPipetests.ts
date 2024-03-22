import { httpClient } from '@equinor/lighthouse-portal-client';
import { Pipetest } from '../../Types/pipetest';

export async function getPipetests(): Promise<Pipetest[]> {
  const { scopeChange } = httpClient();
  const pipetests: Pipetest[] = await scopeChange.fetch(`api/pipetest/JCA`).then((x) => x.json());
  return pipetests;
}
