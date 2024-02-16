import { isProduction } from '../../../Core/Client/Functions';

interface EchoUrls {
    getEchoUrl: (tagNumber: string) => string;
}

const getBaseUrl = () =>
    isProduction() ? 'https://echo.equinor.com' : 'https://dt-echopedia-web-test.azurewebsites.net';

export const echoUrls: EchoUrls = {
    getEchoUrl: (tagNumber: string) =>
        `${getBaseUrl()}/echo3d?instCode=JCA&plantCode=jca&platformSectionId=Full-Pro&cadViewState=&tagNo=${tagNumber}`,
};
