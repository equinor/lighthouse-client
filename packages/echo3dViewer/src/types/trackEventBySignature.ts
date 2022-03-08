export type TrackEventBySignature = (
    objectName: string,
    actionName: string,
    properties: {
        [key: string]: string | number | boolean | string[];
    }
) => void;
