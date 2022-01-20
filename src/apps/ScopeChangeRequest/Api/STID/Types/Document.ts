export interface Document {
    // instCode: string;
    docNo: string;
    docTitle: string;
    // docClass: string;
    // projectCode: string;
    // poNo?: string;
    // system: string;
    // locationCode: string;
    // disciplineCode: string;
    // docCategory: string;
    // docType: string;
    // contrCode: string;
    revNo: string;
    revDate: string;
    currentRevision: CurrentRevision;
    // revStatus: string;
    // revisionProject: string;
    reasonForIssue: string;
    // remark?: string;
    // tagNoMedia?: string;
    // insertedDate: string;
    // updatedDate: string;
    // additionalFields: AdditionalField[];
    // files: File[];
}

interface AdditionalField {
    type: string;
    value: string;
}

export interface CurrentRevision {
    revNo: string;
    revDate: string;
    reasonForIssue: string;
}
