import { httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource } from '@equinor/WorkSpace';
import { ReleaseControl } from '../types/releaseControl';

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { scopeChange } = httpClient();
    return await scopeChange.fetch(`api/releasecontrol`, {
        signal,
    });
}

export const dataSource: DataSource<ReleaseControl> = {
    responseAsync,
    responseParser: async (res) => {
        const ogReleaseControl = (await res.json()) as Omit<ReleaseControl, 'timeOnLastStep'>[];

        return ogReleaseControl.map((rc): ReleaseControl => {
            const timeOnLastStep =
                rc.workflowSteps.toReversed().find((step) => {
                    if (step.criterias[0]?.signedAtUtc) {
                        return true;
                    }
                })?.criterias[0].signedAtUtc ?? rc.createdAtUtc.toString();

            const daysOnStep = resolveDaysOnStep(timeOnLastStep);
            return { ...rc, timeOnLastStep: daysOnStep };
        });
    },
};

export const resolveDaysOnStep = (time: string) => {
    const oneWeek = 1000 * 60 * 60 * 24;
    const date = new Date(time);
    const today = new Date();
    const daysOnStep = Math.round(Math.abs((+date - +today) / oneWeek));

    return daysOnStep.toString();
};

export async function idResolverFunction(id: string): Promise<ReleaseControl> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/releasecontrol/${id}`);
    if (!res.ok) {
        throw 'Not found';
    }
    return res.json();
}
