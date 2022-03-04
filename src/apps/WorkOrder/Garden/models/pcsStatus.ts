export type PCSStatus =
    | 'NoStatus'
    | 'Prepared'
    | 'Cancelled'
    | 'ToMC'
    | 'MCDocsPrepared'
    | 'ToField'
    | 'FromField'
    | 'ComplByMC'
    | 'SentDC'
    | 'SentToPlanning'
    | 'ASBuiltCompleted';
