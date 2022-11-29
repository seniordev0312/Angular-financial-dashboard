import { TableColumn } from "./table-column.model";
import { TableRowAction } from "./table-row-action.model";
import { TableSettings } from "./table-settings.model";


export interface TableConfiguration<T> {
    data: T[];
    dataCount: number;
    columns: TableColumn[];
    tableRowsActionsList: TableRowAction<T>[];
    settings: TableSettings;
}
