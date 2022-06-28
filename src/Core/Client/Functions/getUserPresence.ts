import { httpClient, isProduction } from '@equinor/lighthouse-portal-client';

export async function getUserPresence(userId: string): Promise<Presence> {
    const { fusion } = httpClient();
    fusion.setBaseUrl(`https://pro-s-people-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/`);

    const res = await fusion.fetch(`persons/${userId}/presence`);

    return await res.json();
}

interface Presence {
    activity: Activity;
    availability: Availability;
    id: string;
}

export type Availability = 'Busy' | 'Available' | 'Offline' | 'Away' | 'BeRightBack';
export type Activity = 'Busy' | 'Available' | 'OffWork' | 'Offline' | 'Away' | 'BeRightBack';
