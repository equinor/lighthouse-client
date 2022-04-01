import { useCurrentUser, useHttpClient } from '@equinor/portal-client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type ContextErrorType = 'NotAuthorizedReport' | 'NotAuthorized' | 'MissingContextRelation';

type ErrorOptions = {
    reportId: string;
    contextErrorType: ContextErrorType;
    message?: string;
};
const baseUri = `reports`;

export function useErrorMessage({ reportId, contextErrorType, message }: ErrorOptions) {
    const { fusionPbi } = useHttpClient();
    const user = useCurrentUser();
    const timeStamp = useMemo(() => new Date().toString(), []);

    const accessControlError = useMemo(
        () => contextErrorType !== 'MissingContextRelation',
        [contextErrorType]
    );

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [requirements, setRequirements] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [noAccessMessage, setNoAccessMessage] = useState<string>();

    const errorHeader = useMemo(
        () => (accessControlError ? 'Restricted Access' : 'No Context Data'),
        [accessControlError]
    );
    useEffect(() => {
        accessControlError ? getReportInformation() : getBaseInformation();
    }, [reportId, accessControlError]);

    const getBaseInformation = useCallback(async () => {
        setIsFetching(true);

        try {
            const response = await fusionPbi.get(`${baseUri}/${reportId}`);
            const fetchedDescriptions = await response.json();
            setDescription(fetchedDescriptions?.data);
        } catch {
            setDescription(undefined);
        } finally {
            setRequirements(undefined);
            setNoAccessMessage(message);
            setIsFetching(false);
        }
    }, [fusionPbi, message]);

    const getReportInformation = useCallback(async () => {
        setIsFetching(true);
        try {
            const response = await fusionPbi.fetch(`${baseUri}/${reportId}/rlsrequirements`);
            const fetchedRequirements = await response.text();

            setRequirements(fetchedRequirements);
        } catch {
            setRequirements(undefined);
        }

        try {
            const response = await fusionPbi.fetch(
                `${baseUri}/${reportId}/accessdescription/content`
            );
            const fetchedNoAccessMessage = await response.text();
            setNoAccessMessage(fetchedNoAccessMessage);
        } catch {
            setNoAccessMessage(undefined);
        }

        try {
            const response = await fusionPbi.fetch(`${baseUri}/${reportId}/description/content`);
            const fetchedDescriptions = await response.text();
            setDescription(fetchedDescriptions);
        } catch {
            setDescription(undefined);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return {
        user,
        errorHeader,
        isFetching,
        requirements,
        description,
        noAccessMessage,
        timeStamp,
    };
}
