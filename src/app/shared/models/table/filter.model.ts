import { TableColumnFilterDataType } from "./enum/table-column-filter-data-type.enum";
import { TableColumnFilterType } from "./enum/table-column-filter-type.enum";

export interface Filter {
    value1: number | string | boolean;
    dataType: TableColumnFilterDataType;
    type: TableColumnFilterType;
    property: string;
}
