export interface FunctionalRole {
    Code: string;
    Description: string;
    Email: null;
    InformationEmail: null;
    UsePersonalEmail: null;
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
