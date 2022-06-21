export interface Tag {
    instCode: string;
    tagNo: string;
    description: string;
    tagStatus: string;
    tagCategory: number;
    tagCategoryDescription: string;
    tagType: string;
    system: string;
    subSystem?: string | null;
    mainSystem?: string | null;
    projectCode: string;
    poNo: string;
    locationCode: string;
    disciplineCode: string;
    contrCode: string;
    valveDatash?: string | null;
    valveSize?: string | null;
    valveRating?: string | null;
    nomDiam?: string | null;
    pipingClass: string | null;
    productCode?: string | null;
    insulationClass?: string | null;
    remark?: string | null;
    plantId?: string | null;
    xCoordinate: number;
    yCoordinate: number;
    zCoordinate: number;
    insertedDate: Date;
    updatedDate: Date;
    additionalFields?: AdditionalField[];
}

interface AdditionalField {
    type: string;
    value: string;
}
