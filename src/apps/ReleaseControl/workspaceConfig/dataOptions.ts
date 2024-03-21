import { httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource } from '@equinor/WorkSpace';
import { Criteria, ReleaseControl } from '../types/releaseControl';

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

    const data = ogReleaseControl.map((rc): ReleaseControl => {
      const lastStep = rc.workflowSteps
        .filter((s) => s.criterias.every((s) => !!s.signedAtUtc))
        .flatMap((s) => s.criterias)
        .reduce((acc, curr) => {
          if (!acc) return curr;
          return new Date(acc.signedAtUtc).getTime() > new Date(curr.signedAtUtc).getTime()
            ? acc
            : curr;
        }, null as Criteria | null)?.signedAtUtc;

      const daysOnStep = resolveDaysOnStep(lastStep ?? rc.createdAtUtc.toString());
      return { ...rc, timeOnLastStep: daysOnStep };
    });
    return data;
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
