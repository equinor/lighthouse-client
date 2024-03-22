import { httpClient } from '@equinor/lighthouse-portal-client';

export const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
  const { scopeChange } = httpClient();
  return await scopeChange.fetch(`api/pipetest/JCA`, { signal });
};
