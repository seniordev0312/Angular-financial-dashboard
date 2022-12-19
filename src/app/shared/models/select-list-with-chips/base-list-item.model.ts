import { SecondaryListItem } from "./secondary-list-item.model";

export class BaseListItem {
    id: string;
    name: string;
    secondaryList: SecondaryListItem[]
}