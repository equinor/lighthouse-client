export interface Factory {
    factoryId: string;
    title: string;
    icon?: React.FC;
    onClick: () => void;
    accessCheck?: () => Promise<boolean>;
}
export interface Factories {
    factories: Factory[];
    activeFactory?: Factory;
    scope?: Record<string, unknown>;
}
