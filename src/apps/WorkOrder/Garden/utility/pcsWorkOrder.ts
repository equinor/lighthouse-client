import { PCSStatus } from '../models';

const proCoSysStatuses: Record<PCSStatus, string> = {
    NoStatus: 'No status',
    Prepared: 'WO Prepared',
    Cancelled: 'WO Cancelled',
    ToMC: 'WO to MC',
    MCDocsPrepared: "MC doc's prepared",
    ToField: 'WO to Field',
    FromField: 'WO from Field',
    ComplByMC: 'WO compl. By MC',
    SentDC: 'WO Sent DC',
    SentToPlanning: 'WO Sent to planning',
    ASBuiltCompleted: 'AS Built completed',
};
export enum ProcosysStatuses {
    NoStatus = 'No status',
    Prepared = 'WO Prepared',
    Cancelled = 'WO Cancelled',
    ToMC = 'WO to MC',
    MCDocsPrepared = "MC doc's prepared",
    ToField = 'WO to Field',
    FromField = 'WO from Field',
    ComplByMC = 'WO compl. By MC',
    SentDC = 'WO Sent DC',
    SentToPlanning = 'WO Sent to planning',
    ASBuiltCompleted = 'AS Built completed',
}
export const proCoSysStatusPriorityMap: Record<ProcosysStatuses, number> = {
    [ProcosysStatuses.ASBuiltCompleted]: 0,
    [ProcosysStatuses.SentToPlanning]: 1,
    [ProcosysStatuses.SentDC]: 2,
    [ProcosysStatuses.ComplByMC]: 3,
    [ProcosysStatuses.FromField]: 4,
    [ProcosysStatuses.ToField]: 5,
    [ProcosysStatuses.MCDocsPrepared]: 6,
    [ProcosysStatuses.ToMC]: 7,
    [ProcosysStatuses.Cancelled]: 8,
    [ProcosysStatuses.Prepared]: 9,
    [ProcosysStatuses.NoStatus]: 10,
};
export const proCoSysWorkOrderProgressColorMap: Record<ProcosysStatuses, string> = {
    [ProcosysStatuses.ASBuiltCompleted]: '#99beff',
    [ProcosysStatuses.SentToPlanning]: '#001c4d',
    [ProcosysStatuses.MCDocsPrepared]: '#ecec13',
    [ProcosysStatuses.ToField]: '#22c32a',
    [ProcosysStatuses.FromField]: '#52e059',
    [ProcosysStatuses.ComplByMC]: '#004bcc',
    [ProcosysStatuses.Cancelled]: '#f06542',
    [ProcosysStatuses.SentDC]: '#337eff',
    [ProcosysStatuses.ToMC]: '#e8927d',
    [ProcosysStatuses.Prepared]: '#999999',
    [ProcosysStatuses.NoStatus]: '#bd320f',
};

export const proCoSysWorkOrderColorMap: Record<ProcosysStatuses, string> = {
    [ProcosysStatuses.ASBuiltCompleted]: '#D6E5FF',
    [ProcosysStatuses.SentToPlanning]: '#003CA3',
    [ProcosysStatuses.MCDocsPrepared]: '#F0F04C',
    [ProcosysStatuses.ToField]: '#2FDA37',
    [ProcosysStatuses.FromField]: '#86EA8B',
    [ProcosysStatuses.ComplByMC]: '#0A64FF',
    [ProcosysStatuses.Cancelled]: '#F4937B',
    [ProcosysStatuses.SentDC]: '#70A5FF',
    [ProcosysStatuses.ToMC]: '#F1BEB1',
    [ProcosysStatuses.Prepared]: '#B8B8B8',
    [ProcosysStatuses.NoStatus]: '#EC3E13',
};
