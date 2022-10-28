import { httpClient } from '@equinor/lighthouse-portal-client';
import { Report } from 'powerbi-client';
import { Access } from '../Types/access';
import { AccessToken } from './access-token';

/** Interval time is set to 60000ms = 1 minute */
export const INTERVAL_TIME = 60000;

const getNewUserAccessToken = async (reportId: string): Promise<Access> => {
    const { fusionPbi } = httpClient();
    const response = await fusionPbi.fetch(`reports/${reportId}/token`);
    const token = await response.json();
    if (response.status === 403 || response.status === 401) {
        throw token['error'];
    }
    return token;
};

const MINUTES_BEFORE_EXPIRATION = 2;

const updateToken = async (reportId: string, report: Report | undefined): Promise<void> => {
    const access = AccessToken.getInstance();

    const newAccessToken = await getNewUserAccessToken(reportId);
    access.setAccess(newAccessToken);
    await report?.setAccessToken(newAccessToken.token);
};

/**
 * Function to check if the access token is about to expire. Will retrieve a new access token if
 * it will expire in the next two minutes.
 * @param reportId - The report uri (e.g. pp-punch-analytics)
 * @param report - The embedded report object.
 */
export const checkTokenAndUpdate = (reportId: string, report: Report | undefined): void => {
    const access = AccessToken.getInstance();
    const currentTime = new Date().getTime();
    const expiration = Date.parse(access?.getAccess()?.expirationUtc ?? '');
    const timeUntilExpiration = expiration - currentTime;
    const timeToUpdate = MINUTES_BEFORE_EXPIRATION * 60 * 1000;

    if (timeUntilExpiration <= timeToUpdate) {
        updateToken(reportId, report);
    }
};
