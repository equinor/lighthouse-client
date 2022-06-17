import { httpClient } from '@equinor/lighthouse-portal-client';
import { LoopContent } from '../../types';

export const getLoopContent = async (famFilter: any): Promise<LoopContent[]> => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopcontent/JCA`, {
        body: JSON.stringify(famFilter),
    });

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
};
