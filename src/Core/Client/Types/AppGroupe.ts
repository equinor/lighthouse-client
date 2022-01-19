export type AppGroups = Record<string, AppGroupe>;

export interface AppGroupe {
    name: string;
    icon: string | React.FC;
}
