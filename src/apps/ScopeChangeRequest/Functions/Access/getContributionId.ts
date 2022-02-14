import { canContribute } from '../../Api/ScopeChange/Access/Workflow';

/**
 * Tries to find a contribution the logged in user can find
 * @param contributors
 * @param requestId
 * @param stepId
 */
export function getContributionId(
    contributors: { id: string; contribution: unknown | null }[],
    requestId: string,
    stepId: string
): string | undefined {
    const foundContributor = contributors
        .filter((contributor) => contributor.contribution === null)
        .find(async (contributor) => await canContribute({ requestId: requestId, stepId: stepId, contributorId: contributor.id }));
    if (foundContributor) {
        return foundContributor.id;
    }
}
