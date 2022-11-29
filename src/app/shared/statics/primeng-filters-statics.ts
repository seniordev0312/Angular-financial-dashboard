import { SelectItem } from 'primeng/api';
import { TableColumnFilterType } from '../models/table/enum/table-column-filter-type.enum';

export const TextTableColumnFilterType: SelectItem[] = [
    {
        value: TableColumnFilterType.Contains,
        label: 'contains',
        title: 'primeng.contains',
    },
    {
        value: TableColumnFilterType.StartsWith,
        label: 'startsWith',
        title: 'primeng.startsWith',
    },
    {
        value: TableColumnFilterType.EndsWith,
        label: 'endsWith',
        title: 'primeng.endsWith',
    },
    {
        value: TableColumnFilterType.Equal,
        label: 'equals',
        title: 'primeng.equals',
    },
];

export const NumericTableColumnFilterType: SelectItem[] = [
    {
        value: TableColumnFilterType.Equal,
        label: 'equals',
        title: 'primeng.equals',
    },
    {
        value: TableColumnFilterType.LessThan,
        label: 'lt',
        title: 'primeng.lt',
    },
    {
        value: TableColumnFilterType.LessThanOrEqual,
        label: 'lte',
        title: 'primeng.lte',
    },
    {
        value: TableColumnFilterType.GreaterThan,
        label: 'gt',
        title: 'primeng.gt',
    },
    {
        value: TableColumnFilterType.GreaterThanOrEqual,
        label: 'gte',
        title: 'primeng.gte',
    },
];

export const DateTableColumnFilterType: SelectItem[] = [
    {
        value: TableColumnFilterType.Equal,
        label: 'equals',
        title: 'primeng.equals',
    },
    {
        value: TableColumnFilterType.LessThanOrEqual,
        label: 'lte',
        title: 'primeng.lte',
    },
    {
        value: TableColumnFilterType.GreaterThanOrEqual,
        label: 'gte',
        title: 'primeng.gte',
    },
];
