import { httpClient } from '../../../../Core/Client/Functions';
import { EleNetwork } from '../../Types/eleNetwork';

export async function getEleNetworks(circuitStarterTagNos: string): Promise<EleNetwork[]> {
    const { FAM } = httpClient();
    const eleNetworks: EleNetwork[] = await FAM.fetch(
        `/v0.1/procosys/pipetest/JCA/elenetwork/${circuitStarterTagNos}`
    ).then((x) => x.json());

    return eleNetworks;
}
