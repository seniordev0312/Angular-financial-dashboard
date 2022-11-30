import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from './components/base-component/base-component';
import { WidgetTableComponent } from './components/widget-table/widget-table.component';
import { IconSvgModule } from './utilities-modules/icon-svg.module';
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
import { CardComponent } from './components/card/card.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ButtonComponent } from './components/button/button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SelectListComponent } from './components/select-list/select-list.component';
import { AutomaticFormValidationModule } from './automatic-form-validation/automatic-form-validation.module';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectListWithChipsComponent } from './components/select-list-with-chips/select-list-with-chips.component';
import { MatChipsModule } from '@angular/material/chips';

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
        SelectListWithChipsComponent
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
        ReactiveFormsModule,
        AutomaticFormValidationModule,
        MatChipsModule
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
        SelectListWithChipsComponent
    ],
    providers: [],
})
export class SharedModule { }
