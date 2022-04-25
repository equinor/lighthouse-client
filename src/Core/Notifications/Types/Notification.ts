export interface Notification {
    id: string;
    appKey: string;
    emailPriority: string;
    targetAzureUniqueId: string;
    title: string;
    card: Card;
    created: string;
    createdBy: Person;
    createdByApplication: Application;
    seenByUser: boolean;
    seen: string | null;
    sourceSystem: SourceSystem;
    appName: string;
    actionType: 'URL' | 'Identifier';
}

interface SourceSystem {
    identifier: string;
    name: string;
    subSystem: string;
}

export interface Application {
    id: string;
    title: string;
}

export interface Person {
    id: string;
    name: string;
    jobTitle: string;
    mail: string;
    accountType: PersonAccountType;
}

export interface Card {
    type: 'AdaptiveCard';
    version: string;
    body: CardBody[];
    actions: CardAction[];
}

export interface CardBody {
    type: string;
    id: string;
    text: string;
    wrap: boolean;
}

export interface CardAction {
    type: 'Action.OpenUrl';
    url: string;
    title: string;
}

type PersonAccountType = 'Consultant' | 'Employee' | 'External' | 'Local';
