export type WoStatusMap = Record<string, { status: string; plannedFinishDate: string }[]>;
export type Weeks = {
    one: number;
    two: number;
    three: number;
    four: number;
};
export type WoMapCount = Record<string, Weeks>;
