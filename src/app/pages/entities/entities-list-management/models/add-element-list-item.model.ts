import { ElementsListItem } from "./element-list-item.model";

export interface AddElement {
    entityDefinitionId: string,
    entityDefinitionSectionId: string,
    entityDefinitionField: ElementsListItem;
}