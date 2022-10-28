export type AppGroups = Record<string, AppGroupe>;

export type AppGroupe = {
    name: string;
    icon: string | React.FC;
    columnId: number;
};
