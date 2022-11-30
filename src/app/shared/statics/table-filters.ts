import dayjs from 'dayjs';
import { TableColumnFilterDataType } from '../models/table/enum/table-column-filter-data-type.enum';
import { TableColumnFilterType } from '../models/table/enum/table-column-filter-type.enum';

export const getDataType = (data: any) => {
    if (data !== null) {
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                return data.length > 1 ? TableColumnFilterDataType.Text : TableColumnFilterDataType.Numeric;
            }
            return TableColumnFilterDataType.Date;
        } else if (typeof data === 'number') {
            return TableColumnFilterDataType.Numeric;
        } else if (typeof data === 'boolean') {
            return TableColumnFilterDataType.Bool;
        } else if (typeof data === 'string') {
            return TableColumnFilterDataType.Text;
        }
    }
    return TableColumnFilterDataType.Text;
};

export const getType = (data: any) => {
    if (data.value !== null) {
        if (getDataType(data.value) === 'boolean') {
            return TableColumnFilterType.Equal;
        } else if (Array.isArray(data.value)) {
            return data.value.length > 1 ? TableColumnFilterType.MultipleChoices : TableColumnFilterType.Equal;
        } else if (data.matchMode === 'equals') {
            return TableColumnFilterType.Equal;
        }
    }
    return data.matchMode;
};

export const getFilterValue = (data: any) => {
    if (Array.isArray(data.value)) {
        return data.value.join(',');
    } else if (getDataType(data.value) === TableColumnFilterDataType.Date) {
        return dayjs(data.value).format('DD/MM/YYYY');
    } else if (typeof data.value === 'string' && data.value.length === 0) {
        return null;
    }
    return data.value;
};

export const getParamFilterValue = (data: any) => {
    if (data.type === TableColumnFilterType.MultipleChoices) {
        return data.value1
            .toString()
            .split(',')
            .map((e: string) => Number(e));
    } else if (data.dataType === TableColumnFilterDataType.Text) {
        return data.value1;
    } else if (data.dataType === TableColumnFilterDataType.Date) {
        const date = data.value1.split('/').map((e: string) => Number(e));
        return new Date(date[2], date[1] - 1, date[0]);
    }
    return JSON.parse(data.value1);
};
