export interface ProcosysTask {
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

interface AssignedTo {
    type: number;
    person: Person;
}

interface Person {
    azureUniqueId: string;
    name: string;
    department: string;
    jobTitle: string;
    officeLocation: string;
    mail: string;
    mobilePhone: string;
    isAffiliateAccess: boolean;
    accountType: string;
}
