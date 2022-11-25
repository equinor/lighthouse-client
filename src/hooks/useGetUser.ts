import { httpClient } from '@equinor/lighthouse-portal-client';
import { useQuery } from 'react-query';
type AccountType = 'Consultant' | 'Employee' | 'External' | 'Local';

type Person = {
    accountClassification: string;
    accountType: AccountType;
    azureUniqueId: string | null;
    jobTitle: string | null;
    mail: string | null;
    mobilePhone: string | null;
    name: string | null;
};
const getUser = async (userId?: string, signal?: AbortSignal): Promise<Person> => {
    if (!userId) throw 'No user id';
    const { fusionPeople } = httpClient();
    const res = await fusionPeople.fetch(`persons/${userId}?api-version=4.0`, {
        signal,
    });
    if (!res.ok) throw 'Not found';
    return await res.json();
};

export const useGetUser = (userId?: string) => {
    const { data, isLoading, error } = useQuery(['people', userId], ({ signal }) =>
        getUser(userId, signal)
    );

    return { user: data, isLoadingUser: isLoading, error };
};
