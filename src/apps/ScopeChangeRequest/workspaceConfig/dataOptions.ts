import { httpClient } from '@equinor/lighthouse-portal-client';
import { createAtom } from '../../../Core/Atom/functions/createAtom';
import { DataSource, IdResolverFunc } from '../../../Core/WorkSpace/src';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';
import { getGardenColors } from './sGarden/getGardenColors';

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
    mapWorkflowStatuses(requests);
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

interface WorkflowStatusColors {
    name: string;
    color: string;
}

interface Test {
    items: WorkflowStatusColors[];
}

export const scopeChangeWorkflowStatusSortOrder = createAtom<Test>({ items: [] });

function mapWorkflowStatuses(requests: ScopeChangeRequest[]): void {
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
                !statuses.find(({ name }) => name === s.workflowStatus) &&
                    statuses.push({ name: s.workflowStatus, order: 99 });

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

    const allStatuses = statuses.sort((a, b) => a.order - b.order).map((s) => s.name);

    const colorMap = getGardenColors(allStatuses.length);

    const combined = allStatuses.map((status, index) => ({ name: status, color: colorMap[index] }));

    scopeChangeWorkflowStatusSortOrder.updateAtom({ items: combined });
}
