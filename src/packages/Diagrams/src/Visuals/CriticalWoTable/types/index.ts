export type WoStatusMap<T> = Record<
    string,
    { status: string; plannedStartupDate: string; workorder: T }[]
>;
export type WeekCount<T> = {
    count: number;
    workorder: T[];
};
export type Weeks<T> = {
    one: WeekCount<T>;
    two: WeekCount<T>;
    three: WeekCount<T>;
    four: WeekCount<T>;
};
export type WoMapCount<T> = Record<string, Weeks<T>>;
