export interface File {
    id: number;
    instCode: string;
    fileName: string;
    objectType: string;
    description: string;
    fileOrder: number;
    prodViewCode: string;
    insertedDate: Date;
    thumbnail?: any;
    fileSize: number;
    blobId: string;
}
