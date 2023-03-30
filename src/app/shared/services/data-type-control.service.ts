import { Injectable } from "@angular/core";
import { DataTypeEnum } from "../models/enums/data_type_enum";

@Injectable({
    providedIn: 'root'
})


export class DataTypeControlService {
    public getDataType(id: number) {
        switch (id) {
            case 0:
                return DataTypeEnum.Text;
            case 1:
                return DataTypeEnum.Text;
            case 2:
                return DataTypeEnum.Text;
            case 3:
                return DataTypeEnum.Text;
            case 4:
                return DataTypeEnum.Text;
            case 5:
                return DataTypeEnum.Text;
            case 6:
                return DataTypeEnum.Ein;
            case 7:
                return DataTypeEnum.Text;
            case 8:
                return DataTypeEnum.Text;
            case 9:
                return DataTypeEnum.Text;
            case 10:
                return DataTypeEnum.Date;
            case 11:
                return DataTypeEnum.Text;
            case 12:
                return DataTypeEnum.Number;
            default:
                break;
        }
        return '';
    }
}
