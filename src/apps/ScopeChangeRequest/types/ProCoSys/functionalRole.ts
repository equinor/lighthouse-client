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
    AzureOid: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    Email: string;
}
