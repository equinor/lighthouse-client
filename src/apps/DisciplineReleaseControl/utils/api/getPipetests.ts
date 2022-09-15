import { httpClient } from '@equinor/lighthouse-portal-client';
import { Pipetest } from '../../Types/pipetest';

export async function getPipetests(): Promise<Pipetest[]> {
    const { FAM } = httpClient();
    const pipetests: Pipetest[] = await FAM.fetch(`/v0.1/procosys/pipetest/JCA`).then((x) =>
        x.json()
    );
    return pipetests;
}
