export interface SearchResponse {
    hits: number;
    totalHits: number;
    totalCommPkgHits: number;
    totalMcPkgHits: number;
    totalTagHits: number;
    totalPunchItemHits: number;
    items: SearchItem[];
    debugInfo: string;
}

export interface SearchItem {
    key: string;
    lastUpdated: string;
    plant: string;
    plantName: string;
    project: string;
    projectNames: string[];
    commPkg: CommPkg;
    mcPkg: McPkg;
    tag: Tag;
    punchItem: PunchItem;
}

export interface PunchItem {
    punchItemNo: string;
    description: string;
    tagNo: string;
    responsible: string;
    formType: string;
    category: string;
}

export interface Tag {
    tagNo: string;
    description: string;
    mcPkgNo: string;
    commPkgNo: string;
    area: string;
    disciplineCode: string;
    disciplineDescription: string;
    callOffNo: string;
    purchaseOrderNo: string;
    tagFunctionCode: string;
}

export interface McPkg {
    mcPkgNo: string;
    description: string;
    discipline: string;
    commPkgNo: string;
    responsible: string;
    area: string;
    remark: string;
}

export interface CommPkg {
    commPkgNo: string;
    description: string;
    descriptionOfWork: string;
    remark: string;
    responsible: string;
    area: string;
}
