import { useQuery } from 'react-query';
import { useClientContext, useHttpClient } from '../Core/Client/Hooks';
import { FusionPerson } from '../Core/WorkSpace/src/Components/DataViewerHeader/Header';

export const useContactPerson = () => {
  const fusionPeople = useHttpClient('fusionPeople');
  const { settings } = useClientContext();
  return useQuery<FusionPerson>(['contactperson', settings.contactPerson], async () => {
    const res = await fusionPeople.fetch('persons/ensure?api-version=3.0', {
      method: 'POST',
      headers: { ['content-type']: 'application/json' },
      body: JSON.stringify({ personIdentifiers: [settings.contactPerson] }),
    });

    const data = await res.json();

    return data[0].person;
  });
};
