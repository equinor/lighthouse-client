export interface Assignment {
    externalId: string;
    body: AssignmentBody;
    taskMode: string;
    state: string;
    priority: string;
    dueDate: string | null;
    sourceSystem: SourceSystem;
    ownerApplication: OwnerApplication;
    taskContexts: [];
    metadata: MetaData[];
    createdBy: string;
    created: string;
    modifiedBy: string | null;
    modified: string | null;
    id: string;
    title: string;
    category: string;
    url: string;
    assignedTo: AssignedTo;
    type: 'Internal' | 'External';
}

interface AssignedTo {
    type: string;
    person: Person;
}

interface Person {
    azureUniqueId: string;
    name: string;
    department: string;
    jobTitle: string;
    officeLocation: null;
    mail: string;
    mobilePhone: string;
    isAffiliateAccess: boolean;
    accountType: string;
}

interface MetaDataType {
    internalName: string;
    displayName: string;
    valueType: string;
}

interface MetaData {
    type: MetaDataType;
    value: string;
    valueEntity: string | null;
}
interface SourceSystem {
    name: string;
    subSystem: string;
    identifier: string;
}

interface AssignmentBody {
    type: string;
    payload: string;
}

interface OwnerApplication {
    id: string;
    title: string;
}
