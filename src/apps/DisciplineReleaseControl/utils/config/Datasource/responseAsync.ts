import { httpClient } from '@equinor/lighthouse-portal-client';

export const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
    const { FAM } = httpClient();
    return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal });
};
