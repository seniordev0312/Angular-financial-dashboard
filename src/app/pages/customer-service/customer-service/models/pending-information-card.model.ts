import { ElementsTypes } from "./enum/elementsType.enum";

export interface RequiredProductData {
    defaultData: DefaultData;
    schema: Schema;
    //sections: Sections[]
}

export interface Schema {
    entityCode: string;
    entityDefinitionId: string;
    entityName: string;
    sections: Sections[];
}

export interface DefaultData {
    entityCode: string;
    entityName: string;
    sections: Sections[];
}

export interface Sections {
    description: string;
    entitySectionId: string;
    entityDefinitionId: string;
    entitySectionTemplateId: string;
    sectionName: string;
    fields: FieldsObject[];
}

export interface FieldsObject {
    description: string;
    elementName: string;
    elementType: number;
    indexable: boolean;
    lockModifications: boolean;
    mandatory: boolean;
    script: string;
    regularExpression: string;
    searchable: boolean;
    validation: boolean;
}

export interface ElementsTypeModel {

    link: ElementsTypes.Link;
    dynamicLink: ElementsTypes.DynamicLink,
    check: ElementsTypes.Check,
    select: ElementsTypes.Select,
    table: ElementsTypes.Table,
    attachment: ElementsTypes.Attachment,
    ein: ElementsTypes.Ein,
    text: ElementsTypes.Text,
    script: ElementsTypes.Script,
    textEditor: ElementsTypes.TextEditor,
    date: ElementsTypes.Date,
    dateAndTime: ElementsTypes.DateAndTime,
    number: ElementsTypes.Number,
    string: ElementsTypes.String,
    barcode: ElementsTypes.Barcode,
    button: ElementsTypes.Button,
    color: ElementsTypes.Color,
    currency: ElementsTypes.Currency,
    json: ElementsTypes.Json
}