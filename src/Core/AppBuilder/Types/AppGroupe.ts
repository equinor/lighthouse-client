export type AppGroups = Record<Apps, AppGroupe>;

export interface AppGroupe {
    name: string;
    icon: string | React.FC;
}

export enum Apps {
    AssetData = 'AssetData',
    Top = 'Top',
    Collaboration = 'Collaboration',
    ProgressAndStatus = 'ProgressAndStatus',
    CompletionManagement = 'CompletionManagement',
    ConstructionManagement = 'ConstructionManagement',
    EngineeringManagement = 'EngineeringManagement',
    ProjectInformation = 'ProjectInformation',
    QueriesAndRequests = 'QueriesAndRequests',
    QualityAndCompliance = 'QualityAndCompliance',
    ProjectControl = 'ProjectControl',
    Reports = 'Reports',
    SSU = 'SSU',
}
