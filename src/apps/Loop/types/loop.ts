export type Loop = {
    sourceIdentity: string;
    facility: string;
    project: string | null;
    loopNo: string | null;
    description: string | null;
    functionalSystem: string | null;
    commissioningPackageNo: string | null;
    mechanicalCompletionPackageNo: string | null;
    priority1: null;
    /** RFC */
    c01PlannedDate: Date | null;
    /** RFC */
    c01ForecastDate: Date | null;
    /** RFO */
    c07PlannedDate: Date | null;
    /** RFO */
    c07ForecastDate: Date | null;
    /** Checklist status (?) */
    status: string | null;
    responsible: string | null;
    signedDate: Date | null;
    verifiedDate: Date | null;
    firstMechanicalCompletionStatus: string | null;
    lastPlannedCompletionDate: Date | null;
    lastActualCompletionDate: Date | null;
    sumRemainingManHours: string | null;
};
