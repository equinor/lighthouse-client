import { httpClient } from '@equinor/lighthouse-portal-client';
import { createAtom } from '../../../Core/Atom/functions/createAtom';
import { DataSource, IdResolverFunc } from '../../../Core/WorkSpace/src';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { scopeChange } = httpClient();
    return await scopeChange.fetch(`api/scope-change-requests`, {
        signal: signal,
    });
}

export const dataSource: DataSource<ScopeChangeRequest> = {
    responseAsync,
    responseParser: responseParser,
};

async function responseParser(response: Response): Promise<ScopeChangeRequest[]> {
    const requests: ScopeChangeRequest[] = await response.json();

    const statuses: { name: string; order: number }[] = [];

    requests.forEach((s) => {
        if (!s.workflowStatus) return;
        if (s.workflowSteps.length === 0) return;
        switch (true) {
            case s.workflowSteps[0].isCurrent: {
                //First step
                !statuses.find(({ name }) => name === s.workflowStatus) &&
                    statuses.push({ name: s.workflowStatus, order: 0 });

                break;
            }

            case s.workflowSteps[s.workflowSteps.length - 1].isCompleted: {
                break;
            }

            default: {
                !statuses.find(({ name }) => name === s.workflowStatus) &&
                    statuses.push({
                        name: s.workflowStatus,
                        order: s.workflowSteps.findIndex((s) => s.isCurrent),
                    });
            }
        }
    });
    console.log(statuses);
    return requests;
}

export const idResolver: IdResolverFunc<ScopeChangeRequest> = {
    idResolver: idResolverFunction,
};

async function idResolverFunction(id: string): Promise<ScopeChangeRequest> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/scope-change-requests/${id}`);

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}

interface RequestStats {
    statuses: string[];
    stepNames: string[];
}

export const scopeChangeRequestStats = createAtom<RequestStats>({ statuses: [], stepNames: [] });
