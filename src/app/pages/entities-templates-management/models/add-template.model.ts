import { TemplateElement } from "./template-element.model";

export interface AddTemplate {
    id: number;
    name: string;
    elements: TemplateElement[];
}