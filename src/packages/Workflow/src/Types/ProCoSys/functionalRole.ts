export interface FunctionalRole {
    Code: string;
    Description: string;
    Email: string | null;
    InformationEmail: string | null;
    UsePersonalEmail: boolean | null;
    Classification: 'SCOPECHANGE';
    Persons: Person[];
}

interface Person {
    azureOid: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}
