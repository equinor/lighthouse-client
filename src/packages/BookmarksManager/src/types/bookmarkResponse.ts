import { SourceSystem } from '.';
import { Person } from './person';

export type BookmarkResponse = {
    appKey: string;
    created: Date;
    createdBy: Person;
    id: string;
    isShared: boolean;
    name: string;
    sourceSystem: SourceSystem;
};
export type BookmarkErrorResponse = {
    code?: string;
    exceptionMessage?: string;
    exceptionType?: string;
    message?: string;
};
