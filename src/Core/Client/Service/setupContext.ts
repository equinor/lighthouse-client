import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { httpClient, isProduction } from '../Functions';
import { setSelectedFacility, setSelectedFusionContext } from '../Functions/Context';
import { Facility, FusionContext } from '../Types/ClientContext';

export async function setupContext(client: IHttpClient): Promise<void> {
  const fusionContextId = isProduction()
    ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
    : '71db33bb-cb1b-42cf-b5bf-969c77e40931';

  const response = await client.fetchAsync(`contexts/${fusionContextId}`);
  if (!response.ok) {
    //TODO: Catch and render error?
    throw 'Failed to get fusion context';
  }
  updateContext(await response.json());
}

function updateContext(fusionContext: FusionContext) {
  setSelectedFusionContext(fusionContext);
  const facility: Partial<Facility> = {
    facilityId: fusionContext.externalId,
    fusionContextId: fusionContext.id,
    title: fusionContext.title,
    sapPlantId: fusionContext.value?.sapPlant,
    procosysPlantId: fusionContext.value?.schema,
  };
  setSelectedFacility(facility);
}
