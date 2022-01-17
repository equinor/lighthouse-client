export interface Document {
    instCode: string;
    docNo: string;
    docTitle: string;
    docClass: string;
    projectCode: string;
    poNo?: any;
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
    remark?: any;
    tagNoMedia?: any;
    insertedDate: Date;
    updatedDate: Date;
    additionalFields: any[];
    files: File[];
}
