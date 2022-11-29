import { TableColumnFilterDataType } from "./enum/table-column-filter-data-type.enum";

export interface TableColumnFilter {
    filterType: TableColumnFilterDataType;
    selectOptionsList?: any[];
    selectListViewProperty?: string;
    filterProperty?: string;
}
