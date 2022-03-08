import { FollowUpStatuses, ProcosysStatuses } from '@equinor/GardenUtils';

export const followUpStatusPriorityMap: Record<FollowUpStatuses, number> = {
    [FollowUpStatuses.MaterialAndOrWoNotAvailable]: 3,
    [FollowUpStatuses.MaterialAndWoAvailable]: 2,
    [FollowUpStatuses.MaterialAndWoOk]: 1,
    [FollowUpStatuses.WOFinished]: 0,
};

export const followUpColorMap: Record<FollowUpStatuses, string> = {
    [FollowUpStatuses.WOFinished]: '#1169d9',
    [FollowUpStatuses.MaterialAndWoOk]: '#45aa42',
    [FollowUpStatuses.MaterialAndWoAvailable]: '#fcc330',
    [FollowUpStatuses.MaterialAndOrWoNotAvailable]: '#ff3335',
};

export const followUpProgressColorMap: Record<FollowUpStatuses, string> = {
    [FollowUpStatuses.WOFinished]: '#004bcc',
    [FollowUpStatuses.MaterialAndWoOk]: '#26d92f',
    [FollowUpStatuses.MaterialAndWoAvailable]: '#ffe212',
    [FollowUpStatuses.MaterialAndOrWoNotAvailable]: '#f06d4c',
};

export const orderedProCoSysStatuses: ProcosysStatuses[] = [
    ProcosysStatuses.NoStatus,
    ProcosysStatuses.Prepared,
    ProcosysStatuses.ToMC,
    ProcosysStatuses.MCDocsPrepared,
    ProcosysStatuses.ToField,
    ProcosysStatuses.FromField,
    ProcosysStatuses.ComplByMC,
    ProcosysStatuses.Cancelled,
    ProcosysStatuses.SentDC,
    ProcosysStatuses.ASBuiltCompleted,
    ProcosysStatuses.SentToPlanning,
];
