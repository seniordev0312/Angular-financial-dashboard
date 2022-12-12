import { BaseListItem } from "@root/shared/models/base-list-item.model";

export interface SectionDetails {
    id: string;
    name: string;
    elements: BaseListItem[];
}