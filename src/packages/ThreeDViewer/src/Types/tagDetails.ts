import { AabbModel } from '../services/generated/EchoHierarchyApiClient';

export default interface TagDetails {
    tagNo: string;
    aabb?: AabbModel;
    description?: string;
    tagCategoryDescription?: string;
    tagStatusDescription?: string;
}
