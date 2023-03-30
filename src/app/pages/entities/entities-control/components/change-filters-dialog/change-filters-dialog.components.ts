import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterFieldsModel } from '../../models/filter-fields-model';


@Component({
    selector: 'app-change-filters-dialog',
    templateUrl: 'change-filters-dialog.components.html',
    styleUrls: ['./change-filters-dialog.components.scss']

})
export class ChangeFiltersDialogComponent implements OnInit {
    @ViewChild('selectList') select: any;
    newFilterFields: FilterFieldsModel[] = [];
    resultFields: FilterFieldsModel[] = [];
    activeList: FilterFieldsModel[] = [];
    showSelect = false;
    showSelectField = false;
    searchFormControl = new FormControl(
        '',
    );
    constructor(public dialogRef: MatDialogRef<ChangeFiltersDialogComponent>, private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: { filterFields: FilterFieldsModel[] },) {
    }
    ngOnInit(): void {
        this.newFilterFields = this.data.filterFields;
        this.newFilterFields.forEach((item) => {
            if (item.isActive) {
                this.activeList.push(item);
            }
        })
        this.cdr.detectChanges();
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmitted() {
        const data = {
            newFilterFields: this.newFilterFields
        };
        this.dialogRef.close(data);
    }
    onCheckboxChange(value: FilterFieldsModel) {
        let temp: FilterFieldsModel[] = [];
        this.activeList = [];
        this.newFilterFields.forEach((item) => {
            if (item.elementName === value.elementName) {
                item.isActive = !item.isActive;
                temp.push(item);
            } else {
                temp.push(item);
            }
        })
        this.newFilterFields = temp;
        this.newFilterFields.forEach((item) => {
            if (item.isActive) {
                this.activeList.push(item);
            }
        })
    }


    onTextChanged(query: any) {

        if (query.target.value?.length >= 0) {
            this.showSelectField = true;
            this.resultFields = this.newFilterFields.filter((item) => item.elementName.toLowerCase().includes(query.target.value?.toLowerCase()));
            console.log(this.resultFields)
            this.cdr.detectChanges();
            this.select.open();
            this.select.openedChange.subscribe((isOpen: any) => {
                if (isOpen) {
                    this.showSelect = true;
                } else {
                    this.showSelectField = false;
                    this.showSelect = false;
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.showSelectField = false;
            this.showSelect = false;
            this.cdr.detectChanges();
        }

    }

}
