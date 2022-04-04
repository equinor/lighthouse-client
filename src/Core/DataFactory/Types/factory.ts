export interface Factory {
    factoryId: string;
    title: string;
    icon?: React.FC;
    component: React.FC<{ closeScrim: () => void; setHasUnsavedChanges: (value: boolean) => void }>;
    accessCheck?: () => Promise<boolean>;
}
export interface Factories {
    factories: Factory[];
    activeFactory?: Factory;
    scope?: Record<string, unknown>;
}
