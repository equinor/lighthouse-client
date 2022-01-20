import { Person } from './person';

export interface FunctionalRole {
    Code: string;
    Description: string;
    Email?: any;
    InformationEmail?: any;
    UsePersonalEmail: boolean;
    Classification: string;
    Persons: Person[];
}
