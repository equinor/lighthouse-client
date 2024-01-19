interface EchoUrls {
    getEchoUrl: (tagNumber: string) => string;
}

const getBaseUrl = 'https://echo.equinor.com';

export const echoUrls: EchoUrls = {
    getEchoUrl: (tagNumber: string) =>
        `${getBaseUrl}/echo3d?instCode=JCA&plantCode=jca&platformSectionId=Full-Pro&cadViewState=&tagNo=${tagNumber}`,
};
