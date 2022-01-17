export interface Document {
    instCode: string;
    docNo: string;
    docTitle: string;
    docClass: string;
    projectCode: string;
    poNo?: string;
    system: string;
    locationCode: string;
    disciplineCode: string;
    docCategory: string;
    docType: string;
    contrCode: string;
    revNo: string;
    revDate: Date;
    revStatus: string;
    revisionProject: string;
    reasonForIssue: string;
    remark?: string;
    tagNoMedia?: string;
    insertedDate: Date;
    updatedDate: Date;
    additionalFields: AdditionalField[];
    files: File[];
}

interface AdditionalField {
    type: string;
    value: string;
}
