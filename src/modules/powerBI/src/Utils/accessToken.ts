import { httpClient } from '@equinor/lighthouse-portal-client';
import { Report } from 'powerbi-client';

const getNewUserAccessToken = async (reportId: string) => {
    const { fusionPbi } = httpClient();
    const response = await fusionPbi.fetch(`reports/${reportId}/token`);
    const token = await response.json();
    if (response.status === 403 || response.status === 401) {
        throw token['error'];
    }
    return token;
};

export const MINUTES_BEFORE_EXPIRATION = 2;

export const INTERVAL_TIME = 30000;
let exp: null | string = null;
export const updateToken = async (reportId: string, report: Report | undefined): Promise<void> => {
    const newAccessToken = await getNewUserAccessToken(reportId);
    exp = newAccessToken['expirationUtc'];
    await report?.setAccessToken(newAccessToken.token);
};

export const checkTokenAndUpdate = (
    reportId: string,
    report: Report | undefined,
    tokenExpiration: string
): void => {
    const currentTime = new Date().getTime();
    const expiration = Date.parse(exp ?? tokenExpiration);
    const timeUntilExpiration = expiration - currentTime;
    const timeToUpdate = MINUTES_BEFORE_EXPIRATION * 60 * 1000;
    if (timeUntilExpiration <= timeToUpdate) {
        updateToken(reportId, report);
    }
};
