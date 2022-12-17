import { Permission } from "../enums/permissions.enum";

export class CardItem {
    title: string;
    number?: number;
    route: string;
    permission: Permission;
}