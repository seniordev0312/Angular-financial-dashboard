import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { IconSvgModule } from '@root/shared/utilities-modules/icon-svg.module';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CardComponent } from '@root/shared/components/card/card.component';
import { CardItemComponent } from '@root/shared/components/card-item/card-item.component';
import { ButtonComponent } from '@root/shared/components/button/button.component';
import { InputFieldComponent } from '@root/shared/components/input-field/input-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectListComponent } from '@root/shared/components/select-list/select-list.component';
import { AutomaticFormValidationModule } from '@root/shared/automatic-form-validation/automatic-form-validation.module';
import { DialogHeaderComponent } from '@root/shared/components/dialog-header/dialog-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectListWithChipsComponent } from '@root/shared/components/select-list-with-chips/select-list-with-chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { EntityInformationComponent } from '@root/shared/components/entity-information/entity-information.component';
import { MatDividerModule } from '@angular/material/divider';
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
        EntityInformationComponent
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
        IconSvgModule,
        CommonModule,
        TableModule,
        MultiSelectModule,
        DropdownModule,
        SliderModule,
        PaginatorModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        TranslateModule,
        MatDividerModule,
        ReactiveFormsModule,
        AutomaticFormValidationModule,
        MatChipsModule,
        NotificationModule
    ],
    exports: [
        CardComponent,
        ButtonComponent,
        InputFieldComponent,
        SelectListComponent,
        WidgetTableComponent,
        BaseComponent,
        TranslateModule,
        AutomaticFormValidationModule,
        DialogHeaderComponent,
        SelectListWithChipsComponent,
        EntityInformationComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
})
export class SharedModule { }