import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AutomaticFormValidationModule } from '@root/shared/automatic-form-validation/automatic-form-validation.module';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { ButtonComponent } from '@root/shared/components/button/button.component';
import { CardItemComponent } from '@root/shared/components/card-item/card-item.component';
import { CardComponent } from '@root/shared/components/card/card.component';
import { DialogHeaderComponent } from '@root/shared/components/dialog-header/dialog-header.component';
import { EntityInformationComponent } from '@root/shared/components/entity-information/entity-information.component';
import { InputFieldComponent } from '@root/shared/components/input-field/input-field.component';
import {
    SelectListWithChipsComponent,
} from '@root/shared/components/select-list-with-chips/select-list-with-chips.component';
import { SelectListComponent } from '@root/shared/components/select-list/select-list.component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { IconSvgModule } from '@root/shared/utilities-modules/icon-svg.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { DatePickerInputComponent } from './components/date-picker-input/date-picker-input.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { SingleSelectComponent } from './components/single-select/single-select.component';
import { CanAccessFeatureDirective } from './directives/access-control.directive';
import { NotificationModule } from './notifications/notification.module';

@NgModule({
    declarations: [
        CardItemComponent,
        CardComponent,
        ButtonComponent,
        InputFieldComponent,
        SelectListComponent,
        WidgetTableComponent,
        BaseComponent,
        DialogHeaderComponent,
        SelectListWithChipsComponent,
        EntityInformationComponent,
        MultiSelectComponent,
        SingleSelectComponent,
        DatePickerInputComponent,
        CanAccessFeatureDirective
    ],
    imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatDatepickerModule,
        IconSvgModule,
        CommonModule,
        TableModule,
        MultiSelectModule,
        DropdownModule,
        SliderModule,
        PaginatorModule,
        InputTextModule,
        MatNativeDateModule,
        ButtonModule,
        FormsModule,
        TranslateModule,
        MatDividerModule,
        ReactiveFormsModule,
        AutomaticFormValidationModule,
        MatChipsModule,
        NotificationModule,
        RouterModule,
    ],
    exports: [
        CardComponent,
        ButtonComponent,
        InputFieldComponent,
        SelectListComponent,
        WidgetTableComponent,
        DatePickerInputComponent,
        BaseComponent,
        TranslateModule,
        AutomaticFormValidationModule,
        DialogHeaderComponent,
        SelectListWithChipsComponent,
        EntityInformationComponent,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectComponent,
        SingleSelectComponent,
        CanAccessFeatureDirective,
    ],
    providers: [],
})
export class SharedModule { }