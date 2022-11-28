export type QuerySignature = {
    queryNo: string;
    signatureRole: string;
    sequence: string;
    signedByAzureOid: string;
    functionalRole: string;
    signedDate: Date;
    updatedDate: Date;
};

export type QueryCommpkg = {
    queryNo: string;
    facility: string;
    project: string;
    commissioningPackageNo: string;
    commissioningPackageId: string;
    queryId: string;
    isVoided: string;
    title: string;
    nextToSign: string;
    queryStatus: string;
    queryType: string;
};
