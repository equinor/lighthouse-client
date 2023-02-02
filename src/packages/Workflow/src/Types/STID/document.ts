export interface Document {
    docNo: string;
    docTitle: string;
    revNo: string;
    revDate: string;
    currentRevision: CurrentRevision;
    reasonForIssue: string;
    revStatus: string;
}

export interface CurrentRevision {
    revNo: string;
    revDate: string;
    reasonForIssue: string;
}
