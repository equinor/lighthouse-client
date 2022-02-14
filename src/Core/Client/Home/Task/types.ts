export interface ProcosysTasks {
    id: string;
    title: string;
    category: string;
    url: string;
    assignedTo: AssignedTo;
    siteCode: string;
    projectIdentifier: string;
    projectDescription: string;
    todo: string;
    todoDescription: string;
    description: string;
    responsibilityType: string;
    dueDate: string;
    subCategory: string;
    taskTypeKey: string;
}

export interface AssignedTo {
    type: number;
    person: Person;
}

export interface Person {
    id: string;
    name: string;
    department: string;
    jobTitle: string;
    officeLocation: string;
    mail: string;
    mobilePhone: string;
    isAffiliateAccess: boolean;
    accountType: string;
}
