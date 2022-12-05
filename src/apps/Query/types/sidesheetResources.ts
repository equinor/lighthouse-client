export type QuerySignature = {
    queryNo: string;
    signatureRole: string | null;
    sequence: string | null;
    signedByAzureOid: string | null;
    functionalRole: string | null;
    signedDate: Date | null;
    updatedDate: Date | null;
};

export type QueryCommpkg = {
    queryNo: string;
    facility: string | null;
    project: string | null;
    commissioningPackageNo: string | null;
    commissioningPackageId: string | null;
    queryId: string | null;
    isVoided: string | null;
    title: string | null;
    nextToSign: string | null;
    queryStatus: string | null;
    queryType: string | null;
};
